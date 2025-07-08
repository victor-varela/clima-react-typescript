import type { WeatherDisplay } from "../../types";
import styles from "./Display.module.css";

const Display = ({ weather }: { weather: WeatherDisplay }) => {
  console.log(weather);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{weather.description}</h1>
      <div className={styles.container__main}>
        <p className={styles.main__p}>{weather.feels_like}°C</p>
      </div>
      <div className={styles.container__temp}>
        <p>Mínima: <span>{weather.temp_min}°C</span></p>
        <p>Máxima: <span>{weather.temp_max}°C</span></p>
      </div>
      <div className={styles.container__image}>
        <img src={weather.icon} alt="Weather icon" />
      </div>
    </div>
  );
};

export default Display;
