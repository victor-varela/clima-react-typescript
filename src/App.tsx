import styles from "./App.module.css";
import Form from "./components/Form/Form";
import useWeather from "./hooks/useWeather";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import { Spinner } from "./components/Spinner/Spinner";
function App() {
  const { fetchWeather,fetchCity ,weatherSate, loading, cities } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} cities={cities} fetchCity={fetchCity} />
        {loading && <Spinner />}
        {weatherSate && <WeatherDetails weather={weatherSate} />}
      </div>
    </>
  );
}

export default App;

/* Implementar CSS MODULES:  se importa 'styles' from el archivo modulo.css y en el className se pone en js {styles.nombreDelaClase}

-Para asignar el type de una async function te paras sobre la funcion, y ves lo que dice VsCode en Type etc, etc,... En este caso la function fetchWeather

*/
