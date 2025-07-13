import type { Weather } from "../hooks/useWeather";

//calcular ° C
const kelvin = 273.15;
export const getTemp = (weather: Weather) => ({
  main: {
    temp: Number((weather.main.temp - kelvin).toFixed(0)),
    temp_max: Number((weather.main.temp_max - kelvin).toFixed(0)),
    temp_min: Number((weather.main.temp_min - kelvin).toFixed(0)),
  },
  weather: [
    {
      description: weather.weather[0].description,
      icon: weather.weather[0].icon,
    },
  ],
});
