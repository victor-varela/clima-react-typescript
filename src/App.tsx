import styles from "./App.module.css";
import Form from "./components/Form/Form";
import useWeather from './hooks/useWeather'
function App() {

  const {fetchWeather} = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        <p>2</p>
      </div>
    </>
  );
}

export default App;

/* Implementar CSS MODULES:  se importa 'styles' from el archivo modulo.css y en el className se pone en js {styles.nombreDelaClase}

-Para asignar el type de una async function te paras sobre la funcion, y ves lo que dice VsCode en Type etc, etc,... En este caso la function fetchWeather

*/
