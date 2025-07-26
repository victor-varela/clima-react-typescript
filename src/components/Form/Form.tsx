import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import type { CityName, SearchType } from "../../types";
import type { City } from "../../hooks/useWeather";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
  fetchCity: (city: CityName) => Promise<void>;
  cities: City;
};

const Form = ({ fetchWeather, cities, fetchCity }: FormProps) => {
  const [city, setCity] = useState<CityName>({ name: "" });

  const [search, setSearch] = useState<SearchType>({
    city: {
      id: 0,
      lat: 0,
      lon: 0,
    },
  }); //se crean los types en su carpeta y se importan. Se inicializan los valores del obj search

  useEffect(() => {
    if (search.city.id !== 0) {
      fetchWeather(search);
    }
  }, [search]);
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity({ ...city, [e.target.name]: e.target.value });
    fetchCity(city);
  };

  const handleClick = (id: number) => {
    console.log(id);
    const selectedCity = cities.find(city => city.id === id);
    if (selectedCity) {
      setSearch({
        city: {
          id: selectedCity.id,
          lat: selectedCity.latitude,
          lon: selectedCity.longitude,
        },
      });

      setCity({ name: "" });
    }
  }; //Se usa la tecnica de la abuela. En el input el name es igual al nombre del campo en el obj

  return (
    <>
      <form className={styles.form}>
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input id="city" type="text" name="name" placeholder="Ciudad" value={city.name} onChange={handleCityChange} />
        </div>
        <div>
          <div id="citiesByCountry" className={styles.citiesByCountry}>
            {/* <option>--Seleccione una ciudad--</option> */}
            {cities.map(city => (
              <p key={city.id} onClick={() => handleClick(city.id)}>
                {city.name}, {city.country}
              </p>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;

/*Usamos un custom hook para manejar las peticiones a la API.

Si el custom hook es exclusivo del componente Form, usalo dentro de Form.tsx.
Si lo usan varios componentes, entonces considerá levantarlo al App o usar un Contexto.



*/
