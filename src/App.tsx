import styles from "./App.module.css";
import Form from "./components/Form/Form";
function App() {
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form/>
        <p>2</p>
      </div>
    </>
  );
}

export default App;

// Implementar CSS MODULES:  se importa 'styles' from el archivo modulo.css y en el className se pone en js {styles.nombreDelaClase}
