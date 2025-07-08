import { useEffect } from "react";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import Display from "./components/WeatherDisplay/Display";
import useWeather from "./hooks/useWeather";
import Error from "./components/Error/Error";
function App() {
  const { fetchWeather, weather, error } = useWeather();

  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {error && <Error/>}
        {weather && <Display weather={weather} />}
      </div>
    </>
  );
}

export default App;

/* Implementar CSS MODULES:  se importa 'styles' from el archivo modulo.css y en el className se pone en js {styles.nombreDelaClase}

-Para asignar el type de una async function te paras sobre la funcion, y ves lo que dice VsCode en Type etc, etc,... En este caso la function fetchWeather

*/
