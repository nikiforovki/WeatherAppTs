export type Coords = {
  lat: number;
  lon: number;
} | null;

export type Theme = "light" | "dark" | "system";

export type {
  DailyForecast,
  ForecastListItem,
  ForecastResponse,
} from "../utils/type";
export type {
  DayForecast,
  HourlyPoint,
  ForecastData,
} from "../features/weather/types";
export type { ForecastProps } from "../components/WeatherWidget/type";
