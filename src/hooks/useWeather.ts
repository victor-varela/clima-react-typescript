import axios from "axios";
import type { SearchType, WeatherData, WeatherDisplay } from "../types";
import { getTemp } from "../helpers";
import { useState } from "react";

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherDisplay>();

  //recibe search de tipo SearchType por lo tanto ya es un Objeto, no necesita {}.
  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    // encodeURIComponent(search.city) --> para enviar parametros por la URL. Reemplaza caraceteres especiales por otros que no afecten la consulta. Ej: 'las vegas' tiene un espacio y eso rompe la consulta, esta funcion lo reemplaza con otros caracteres que hace que la api las reconozca y devuelva el resultado
    //  console.log('encode',search.city, encodeURI(search.city));

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(search.city)},${
        search.country
      }&appid=${apiKey}`;

      const res = await axios(geoUrl);

      const lat = res.data[0].lat;
      const lon = res.data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es`;
      const { data } = await axios(weatherUrl);
      const {
        main: { feels_like, temp, temp_max, temp_min },
        weather,
      } = data;
      const weatherData: WeatherData = {
        feels_like,
        temp,
        temp_max,
        temp_min,
        description: weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
      }; //la clave del objeto y la variable tienen el mismo nombre, no hace falta asignarlos explicitamente

      const tempWeather = getTemp(weatherData);
      console.log(tempWeather);

      setWeather(tempWeather);
      console.log(
        "Actualmente: Temperatura:",
        weather?.temp,
        "Sensacion Termica:",
        weather?.feels_like,
        "Minima:",
        weather?.temp_min,
        "Maxima:",
        weather?.temp_max,
        "Esta:",
        weather?.description
      );
      console.log(weather);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather,
    weather,
  };
}

/*Esta estructura se te parece a algo, no? una funcion que retorna funciones.. es como el useContext
    - Usamos Axios (libreria para hacer peticiones). Recuerda, siempre que hacemos fetch, es una async function y si es async funtcion entonces es try catch

    - OJO que cuando obtenemos datos de una API, Ts NO tiene idea que type va a ser.. eso hay que resolverlo.

    - La apiKey debe ser una variable de entorno, eso de cajon. Sino esta visible en GitHub. Anteriormente las variables de entorno las habias usado en Node.js y las manejabas con la funcion process. Ahora en React, mejor dicho en VITE, se manejan diferente. Ve a la doc (https://vite.dev/guide/env-and-mode) y repasa. El archivo .env.local es en la RAIZ del proyecto, no en src Para acceder es  con import.meta.env y los nombres estan predeterminados VITE_SOME_KEY. Recuerda reinciar el servidor cuando creas .env

    - Lo que nos interesa de la respuesta de la API es el campo 'data' por eso hacemos destructuring con ese mismo nombre, asi accedemos directamente.


*/
