import type { SearchType } from "../types";

export default function useWeather() {
  //recibe search de tipo SearchType por lo tanto ya es un Objeto, no necesita {}.
  const fetchWeather = async (search: SearchType) => {
    const apiKey = "6ab2fd222168f14bf03296bacc4bacce";

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;
    console.log(geoUrl);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather,
  };
}

/*Esta estructura se te parece a algo, no? una funcion que retorna funciones.. es como el useContext
    - Usamos Axios (libreria para hacer peticiones). Recuerda, siempre que hacemos fetch, es una async function y si es async funtcion entonces es try catch


*/
