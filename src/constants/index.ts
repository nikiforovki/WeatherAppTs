// Типы тем
export const THEME_TYPES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
} as const;

// Режимы отображения (для UI)
export const THEME_MODES = {
  NIGHTMODE: "NIGHTMODE",
  DAYMODE: "DAYMODE",
} as const;

// Ключи для localStorage
export {
  THEME_STORAGE_KEY as STORAGE_KEY,
  HTML_THEME_ATTRIBUTE,
  THEME_UPDATE_INTERVAL_MS,
} from "./theme";

export { LS_KEYS } from "./storage";

// Ключи для react-query
export { QUERY_KEYS } from "./queryKeys";

// Временные константы
export {
  DAY_START_HOUR as DAY_START,
  NIGHT_START_HOUR as NIGHT_START,
  INPUT_DROPDOWN_CLOSE_DELAY_MS,
} from "./time";

// Настройки форматирования
export {
  FORECAST_WEEKDAY_FORMAT as WEEKDAY_FORMAT,
  FORECAST_DATE_FORMAT as DATE_FORMAT,
  FORECAST_TARGET_TIME as TARGET_TIME,
  FORECAST_DAYS_LIMIT as DAYS_LIMIT,
} from "./weather";

// Параметры API
export {
  WEATHER_API_UNITS as UNITS,
  WEATHER_API_LANGUAGE as LANGUAGE,
} from "./weather";

export const STALE_TIME = 30000; // 30 секунд
export const TIMEOUT = 10000;

// Константы для форматирования времени
export const TIME_FORMATS = {
  TWO_DIGIT: "2-digit",
} as const;
