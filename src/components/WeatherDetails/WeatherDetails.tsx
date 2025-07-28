import type { Weather } from "../../hooks/useWeather";
import styles from "./WeatherDetails.module.css";

const WeatherDetails = ({ weather, selectedCity }: { weather: Weather; selectedCity: string }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clima de {selectedCity}</h1>
      <h2 className={styles.sub_title}>{weather.weather[0].description}</h2>
      <div className={styles.container__main}>
        <p className={styles.main__p}>{weather.main.temp}°C</p>
      </div>
      <div className={styles.container__temp}>
        <p>
          Mínima: <span>{weather.main.temp_min}°C</span>
        </p>
        <p>
          Máxima: <span>{weather.main.temp_max}°C</span>
        </p>
      </div>
      <div className={styles.container__image}>
        <img src={weather.weather[0].icon} alt="Weather icon" />
      </div>
    </div>
  );
};

export default WeatherDetails;
