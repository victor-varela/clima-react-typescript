
export type SearchType = {
    city:string,
    country:string
}

export type Country={
    code:string,
    name:string
}

export type WeatherData={
    feels_like: number;
    temp:number;
    temp_max: number;
    temp_min: number;
}

export type WeatherDisplay={
     feels_like: string;
    temp:string;
    temp_max: string;
    temp_min: string;
}