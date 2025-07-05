import type { WeatherData, WeatherDisplay } from "../types";

//calcular ° C
const kelvin = 273.15
export const getTemp = (weather: WeatherData) : WeatherDisplay => ({
  feels_like: (weather.feels_like - kelvin).toFixed(0),
  temp: (weather.temp - kelvin).toFixed(0),
  temp_max: (weather.temp_max - kelvin).toFixed(0),
  temp_min: (weather.temp_min - kelvin).toFixed(0),
});
