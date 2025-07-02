import styles from "./Form.module.css";
import { countries } from "../../data";
import { useState } from "react";
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

const Form = () => {

  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  }); //se crean los types en su carpeta y se importan. Se inicializan los valores del obj search

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };//Se usa la tecnica de la abuela. En el input el name es igual al nombre del campo en el obj

  //State de Alert para manejo de errores
  const [alert, setAlert] = useState('') //inicializa en string vacio, no hace falta el type


//El handleSubmit va con el type infiriendo en el form e=> y hover. Y el viejo truco object.values(obj).includes('')
const handleSubmit= (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()

  if(Object.values(search).includes('')){
    setAlert('todos los campos son obligatorios')
    return
  }

}
  

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* evaluamos si hay errores y renderizamos */}
        {alert && <Alert>{alert}</Alert>}
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input id="city" type="text" name="city" placeholder="Ciudad" value={search.city} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="countries">Pais:</label>
          <select id="countries" name="country" value={search.country} onChange={handleChange}>
            <option>--Seleccione un pais--</option>
            {countries.map(country => (
              <option value={country.code} key={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type="submit" value="Consultar Clima" />
        </div>
      </form>
    </>
  );
};

export default Form;
