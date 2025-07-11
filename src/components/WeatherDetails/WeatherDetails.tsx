import type { WeatherData} from "../../types";
import styles from "./WeatherDetails.module.css";

const WeatherDetails = ({ weather }: { weather: WeatherData }) => {
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{weather.description}</h1>
      <div className={styles.container__main}>
        <p className={styles.main__p}>{weather.temp}°C</p>
      </div>
      <div className={styles.container__temp}>
        <p>
          Mínima: <span>{weather.temp_min}°C</span>
        </p>
        <p>
          Máxima: <span>{weather.temp_max}°C</span>
        </p>
      </div>
      <div className={styles.container__image}>
        <img src={weather.icon} alt="Weather icon" />
      </div>
    </div>
  );
};

export default WeatherDetails;
