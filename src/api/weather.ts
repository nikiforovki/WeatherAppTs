import {
  WEATHER_API_ENDPOINT_CURRENT,
  WEATHER_API_ENDPOINT_FORECAST,
  WEATHER_API_UNITS,
  WEATHER_API_LANGUAGE,
} from "../constants/weather";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const weatherApiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: apiKey,
    units: WEATHER_API_UNITS,
    lang: WEATHER_API_LANGUAGE,
  },
  timeout: 10000,
});

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
  const response = await weatherApiClient.get<WeatherData>(
    WEATHER_API_ENDPOINT_CURRENT,
    {
      params: {
        q: city,
        units: WEATHER_API_UNITS,
        lang: WEATHER_API_LANGUAGE,
      },
    }
  );

  return response.data;
}

export async function getForecast(city: string): Promise<ForecastData> {
  const response = await weatherApiClient.get<ForecastData>(
    WEATHER_API_ENDPOINT_FORECAST,
    {
      params: {
        q: city,
        units: WEATHER_API_UNITS,
        lang: WEATHER_API_LANGUAGE,
      },
    }
  );

  return response.data;
}

export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const response = await weatherApiClient.get<WeatherData>(
    WEATHER_API_ENDPOINT_CURRENT,
    {
      params: {
        lat,
        lon,
        units: WEATHER_API_UNITS,
        lang: WEATHER_API_LANGUAGE,
      },
    }
  );

  return response.data;
}

export async function getForecastByCoords(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const response = await weatherApiClient.get<ForecastData>(
    WEATHER_API_ENDPOINT_FORECAST,
    {
      params: {
        lat,
        lon,
        units: WEATHER_API_UNITS,
        lang: WEATHER_API_LANGUAGE,
      },
    }
  );

  return response.data;
}
