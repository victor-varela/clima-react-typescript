import axios from "axios";
import { z } from "zod";
import type { SearchType } from "../types";
import { getTemp } from "../helpers";
import { useState } from "react";



//Zod : zod va a INFERIR el type que genera el schema.
//1.Creamos el schema fijandonos la estructura de la api.

//Le estás diciendo a Zod:

// “weather es un array de objetos, y cada objeto tiene una propiedad description de tipo string y una icon de tipo string.”

// No importa si la API siempre devuelve un solo elemento en el array. El esquema dice: “esto puede tener uno o más objetos con esta forma.”

const Weather = z.object({
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
  weather: z.array(
    z.object({
      description: z.string(),
      icon: z.string(),
    })
  ),
});

//2. Creamos el type con el schema que ya hicimos. Sintaxis de zod. Este type lo usamos en el state de WeahtherState en lugar del WeatherData que hiciste en un principio ya que ahi el type esta 'casteado' no viene validado desde zod
export type Weather = z.infer<typeof Weather>;

//Creamos el schema de lat y lon. Son propiedades de tipo number dentro de un array. Eso lo ves logeando la respuesta ves que toda la respuesta es un objeto PERO, lo que quieres tipar, validar, es la propiedad data. data es un array de objetos. por eso el schema es un array de objeto.

const GeoSchema = z.array(
  z.object({
    lat: z.number(),
    lon: z.number(),
  })
);

export default function useWeather() {
  const [weatherSate, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //recibe search de tipo SearchType por lo tanto ya es un Objeto, no necesita {}.
  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(null);
    setError(false);
    // encodeURIComponent(search.city) --> para enviar parametros por la URL. Reemplaza caraceteres especiales por otros que no afecten la consulta. Ej: 'las vegas' tiene un espacio y eso rompe la consulta, esta funcion lo reemplaza con otros caracteres que hace que la api las reconozca y devuelva el resultado
    //  console.log('encode',search.city, encodeURI(search.city));

// rapidAPI
const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  params: {countryIds: `${search.country}`, limit:10, minPopulation: 500000, type: 'CITY', sort:'-population'},
  headers: {
    'x-rapidapi-key': 'da81a68529msh80b3f345aec3c13p18abfbjsnf8ada1240185',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

//RapidApi

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(search.city)},${
        search.country
      }&appid=${apiKey}`;

      const res = await axios(geoUrl); // res es ANY, fijate el "schema" que devuelve te doy una pista, es un OBJETO jeje, y la propiedad data es un ARRAY de OBJETOS por lo tanto, el schema es un array y las propiedades lat y lon son number.

      // validación lógica: ciudad no encontrada
      if(!res.data.length){
         setError(true);
         return
      }

      const parsedGeo = GeoSchema.safeParse(res.data); //es res.data porque ahi esta lo que queremos, no hice destructuring {data} porque tiene el mismo nombre que la siguiente llamada a la api

      //Zod verifica que este correcto el schema, lat y lon son number. Hicimos todo eso para hacer el if success.

      if (!parsedGeo.success) {
        //si entra aca, no rompe la app--> esa es toda la ventaja de tanta comprobacion.// validación estructural: datos mal formados
        console.log("error", parsedGeo.error.message);
        setError(true)
        return;
      }
      const { lat, lon } = res.data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es`;
      const { data } = await axios(weatherUrl);
      const result = Weather.safeParse(data); //zod .safeParse()--> aca Zod verifica

      //Poder hacer esta comprobacion (este if) es la RAZON para usar Zod. Si no cumple entonces tenemos oportunidad de MANEJAR el error --> enviar una alerta o lo que sea y la App sigue FUNCIONANDO.
      if (!result.success) {
        console.log("error", result.error.message);
        return;
      }
      const {
        main: { temp, temp_max, temp_min },
        weather,
      } = result.data;

      const { description, icon } = weather[0];

      const weatherData: Weather = {
        main: {
          temp,
          temp_max,
          temp_min,
        },
        weather: [
          {
            description,
            icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          },
        ],
      }; //la clave del objeto y la variable tienen el mismo nombre, no hace falta asignarlos explicitamente

      // const tempWeather = getTemp(weatherData); refactor->

      setWeather(getTemp(weatherData));
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchWeather,
    weatherSate,
    error,
    loading,
  };
}

/*Esta estructura se te parece a algo, no? una funcion que retorna funciones.. es como el useContext
    - Usamos Axios (libreria para hacer peticiones). Recuerda, siempre que hacemos fetch, es una async function y si es async funtcion entonces es try catch

    - OJO que cuando obtenemos datos de una API, Ts NO tiene idea que type va a ser.. eso hay que resolverlo.

    - La apiKey debe ser una variable de entorno, eso de cajon. Sino esta visible en GitHub. Anteriormente las variables de entorno las habias usado en Node.js y las manejabas con la funcion process. Ahora en React, mejor dicho en VITE, se manejan diferente. Ve a la doc (https://vite.dev/guide/env-and-mode) y repasa. El archivo .env.local es en la RAIZ del proyecto, no en src Para acceder es  con import.meta.env y los nombres estan predeterminados VITE_SOME_KEY. Recuerda reinciar el servidor cuando creas .env

    - Lo que nos interesa de la respuesta de la API es el campo 'data' por eso hacemos destructuring con ese mismo nombre, asi accedemos directamente.


    
  DILEMA DEL TIPADO DE RESPUESTAS DE API EN TS:

  - Cuando se consume una API, la respuesta viene como `any`. 
    TypeScript no puede inferir automáticamente su estructura.

  - Hay varias técnicas para tipar:

    1. Genéricos (`<MyType>`): práctica común y cómoda. No valida datos reales, 
       útil cuando la API es confiable y estable.

    2. Type Assertion (`as MyType`): forzás el tipo sin validación. Riesgoso. "SI CAMBIA LA ESTRUCTURA DE LA API VA A MARCAR UNDEFINED Y ROMPE LA APP"

    3. Type Guards: validás manualmente campos clave. Más seguro, pero más código. "PASAS LA RESPUESTA DE LA API POR UNA COMPROBACION Y LUEGO IF(COMPROBACION) AHI MANEJAS LA RESPUESTA, ELSE MANEJAS EL ERROR. ESTO NO LO TIENES CON <MyType> VAS CIEGO.."

    4. Librerías como Zod/Yup: validación en tiempo de ejecución (ESTO ES LA CLAVE). Requiere conocer 
       la estructura igual, pero ofrece máxima seguridad. "SI CAMBIA LA ESTRUCTURA DE LA API TE VA AVISAR Y NO ROMPE LA APP"

  - Elegir técnica según contexto:
      * API confiable → Genérico
      * API incierta o crítica → Zod / Type Guards
      * 
  
    "La gran diferencia entre usar <MyType> y usar Zod no es qué tanto sabés de la respuesta, sino cuán seguro estás de que siempre será así."

  - Conclusión: el tipado manual mejora la DX pero no asegura que los datos 
    recibidos sean válidos. Validar en runtime es clave si el dato es sensible o externo.

    😬 El problema de ambos enfoques (<MyType> y as MyType)
No se valida nada en tiempo de ejecución.

Si la API cambia (por ej., te devuelve description como null o elimina weather), tu app puede crashear sin advertencia.

TypeScript no te protege contra datos corruptos o incompletos porque solo trabaja en tiempo de desarrollo.

La diferencia clave: Zod valida en tiempo de ejecución.

🔍 ¿Qué hace Zod?
ts
Copiar
Editar
const result = WeatherSchema.safeParse(response.data);
Verifica que temp, feels_like, etc., existan.

Verifica que sean del tipo correcto (número, string, etc).

Si algo falta o está mal, te lo avisa antes de que tu app explote.

// ⚠️ No esperes al catch para validar errores previsibles:
// El bloque `catch` está pensado para errores inesperados (red, servidor caído, etc).
// Usá validaciones antes (con Zod, por ejemplo) para detectar respuestas inválidas y evitar ejecutar código innecesario.
// ✔️ Catch solo para fallos realmente imprevistos, no para controlar lógica del flujo.

*/
