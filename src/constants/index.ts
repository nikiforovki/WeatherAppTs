// Типы тем
export const THEME_TYPES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
};

// Режимы отображения (для UI)
export const THEME_MODES = {
  NIGHTMODE: "NIGHTMODE",
  DAYMODE: "DAYMODE",
};

// Ключи для localStorage
export const STORAGE_KEY = "theme";
export const LS_KEY = "favoriteCities";

// Ключи для react-query
export const QUERY_KEYS = {
  WEATHER: "weather",
  FORECAST: "forecast",
  WEATHER_BY_COORDS: "weatherByCoords",
  FORECAST_BY_COORDS: "forecastByCoords",
};

// Временные константы
export const TIME_CONSTANTS = {
  DAY_START: 7,
  NIGHT_START: 19,
  STALE_TIME: 30000, // 30 секунд
};

// Настройки форматирования
export const FORMAT_CONSTANTS = {
  WEEKDAY_FORMAT: "EEEE",
  DATE_FORMAT: "d MMMM",
  TARGET_TIME: "12:00:00",
  DAYS_LIMIT: 6,
};

// Параметры API
export const API_PARAMS = {
  UNITS: "metric",
  LANGUAGE: "ru",
  TIMEOUT: 10000,
};

// Импорт констант из других файлов
export {
  INPUT_DROPDOWN_CLOSE_DELAY_MS,
  DAY_START_HOUR,
  NIGHT_START_HOUR,
} from "./time";
export { LS_KEYS } from "./storage";
export {
  FORECAST_WEEKDAY_FORMAT,
  FORECAST_DATE_FORMAT,
  FORECAST_DAYS_LIMIT,
  FORECAST_TARGET_TIME,
} from "./weather";
export {
  THEME_STORAGE_KEY,
  HTML_THEME_ATTRIBUTE,
  THEME_UPDATE_INTERVAL_MS,
} from "./theme";
