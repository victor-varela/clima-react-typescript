export type SearchType = {
  city: string;
  country: string;
};

export type Country = {
  code: string;
  name: string;
};

  //Esto es util si la API es confiable pero NO protege contra cambios en la estructura de la API. Puede romper el codigo
  // "La gran diferencia entre usar <MyType> y usar Zod no es qué tanto sabés de la respuesta, sino cuán seguro estás de que siempre será así."
export type WeatherData = {
  temp: number;
  temp_max: number;
  temp_min: number;
  description: string,
  icon: string
};

export type WeatherDisplay = {
  feels_like: string;
  temp: string;
  temp_max: string;
  temp_min: string;
  description: string;
  icon: string;
};
