import styles from "./Form.module.css";
import { countries } from "../../data";

const Form = () => {
  return (
    <>
      <form className={styles.form}>
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input id="city" type="text" name="city" placeholder="Ciudad" />
        </div>
        <div>
          <label htmlFor="countries">Pais:</label>
          <select id="countries">
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
