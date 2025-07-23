import styles from "./Form.module.css";
import { formatCountries } from "../../data";
import { useEffect, useState } from "react";
import type { CityName,  SearchType } from "../../types";
import Alert from "../Alert/Alert";
import type { City } from "../../hooks/useWeather";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
  fetchCity: (city: CityName) => Promise<void>;
  cities: City;
};

const Form = ({ fetchWeather, cities, fetchCity }: FormProps) => {
  useEffect(() => {
    console.log(cities);
  }, [cities]);

  const [city, setCity] = useState<CityName>({name:""})

  const [search, setSearch] = useState<SearchType>({
    city: {
      id: 0,
      lat: 0,
      lon: 0,
    }
  }); //se crean los types en su carpeta y se importan. Se inicializan los valores del obj search


  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setCity({...city,[e.target.name]: e.target.value})
    fetchCity(city)
  };

  const handleChange = (id: number) => {
    console.log(id);
    const selectedCity = cities.find(city => city.id === (id));
    if (selectedCity) {
      setSearch({
        ...search,
        city: {
          id: selectedCity.id,
          lat: selectedCity.latitude,
          lon: selectedCity.longitude,
        },
      });
    }

    fetchWeather(search);
    setCity({name:""})
  }; //Se usa la tecnica de la abuela. En el input el name es igual al nombre del campo en el obj

  //State de Alert para manejo de errores
  const [alert, setAlert] = useState(""); //inicializa en string vacio, no hace falta el type

  //El handleSubmit va con el type infiriendo en el form e=> y hover. Y el viejo truco object.values(obj).includes('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);

    //Paso la validacion. Consultamos la API con el custom hook
    fetchWeather(search);
    setCity({name:""})
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* evaluamos si hay errores y renderizamos, lo enviamos como children. SIN props : ) */}
        {alert && <Alert>{alert}</Alert>}
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input
            id="city"
            type="text"
            name="name"
            placeholder="Ciudad"
            value={city.name}
            onChange={handleCityChange}
          />
        </div>
        <div>
          {/* <label htmlFor="countries">Pais:</label>
          <select id="countries" name="country" value={search.country} onChange={handleChange}>
            <option>--Seleccione un pais--</option>
            {formatCountries.map(country => (
              <option value={country.code} key={country.code}>
                {country.name}
              </option>
            ))}
          </select> */}
          <div id="citiesByCountry" name="city" value={search.city.id} >
            {/* <option>--Seleccione una ciudad--</option> */}
            {cities.map(city => (
              <p value={city.id} key={city.id} onClick={()=>handleChange(city.id)}>
                {city.name}, {city.country}
              </p>
            ))}
          </div>
        </div>
        {/* <div>
          <input type="submit" value="Consultar Clima" />
        </div> */}
      </form>
    </>
  );
};

export default Form;

/*Usamos un custom hook para manejar las peticiones a la API.

Si el custom hook es exclusivo del componente Form, usalo dentro de Form.tsx.
Si lo usan varios componentes, entonces considerá levantarlo al App o usar un Contexto.



*/
