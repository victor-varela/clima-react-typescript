import { countries } from "../../data";

const Form = () => {
  return (
    <>
      <form>
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input id="city" type="text" name="city" placeholder="Ciudad" />
        </div>
        <div>
          <label htmlFor="contries">Pais:</label>
          <select >
            <option id="countries">--Seleccione un pais--</option>
            {countries.map(country => (
              <option value={country.code} key={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value='Consultar Clima' />
      </form>
    </>
  );
};

export default Form;
