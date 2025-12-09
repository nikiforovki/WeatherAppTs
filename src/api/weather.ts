import {
  WEATHER_API_BASE_URL,
  WEATHER_API_ENDPOINT_CURRENT,
  WEATHER_API_ENDPOINT_FORECAST,
  WEATHER_API_UNITS,
  WEATHER_API_LANGUAGE,
} from "../constants/weather";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// Типы для данных API
export type WeatherData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  cod: number;
};

export type ForecastData = {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export async function getWeather(city: string): Promise<WeatherData> {
  const url = `${WEATHER_API_BASE_URL}${WEATHER_API_ENDPOINT_CURRENT}?q=${city}&appid=${apiKey}&units=${WEATHER_API_UNITS}&lang=${WEATHER_API_LANGUAGE}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`);
  }

  const data: WeatherData = await res.json();
  console.log("Weather data:", data);
  return data;
}

export async function getForecast(city: string): Promise<ForecastData> {
  const url = `${WEATHER_API_BASE_URL}${WEATHER_API_ENDPOINT_FORECAST}?q=${city}&appid=${apiKey}&units=${WEATHER_API_UNITS}&lang=${WEATHER_API_LANGUAGE}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Ошибка запроса прогноза: ${res.status} ${res.statusText}`);
  }

  const data: ForecastData = await res.json();
  console.log("Forecast data:", data);
  return data;
}

export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const url = `${WEATHER_API_BASE_URL}${WEATHER_API_ENDPOINT_CURRENT}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${WEATHER_API_UNITS}&lang=${WEATHER_API_LANGUAGE}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Ошибка запроса по координатам: ${res.status} ${res.statusText}`
    );
  }

  const data: WeatherData = await res.json();
  console.log("Данные о погоде по координатам:", data);
  return data;
}

export async function getForecastByCoords(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const url = `${WEATHER_API_BASE_URL}${WEATHER_API_ENDPOINT_FORECAST}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${WEATHER_API_UNITS}&lang=${WEATHER_API_LANGUAGE}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Ошибка запроса прогноза по координатам: ${res.status} ${res.statusText}`
    );
  }

  const data: ForecastData = await res.json();
  console.log("Forecast data by coords:", data);
  return data;
}
