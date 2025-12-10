import { groupForecastByDay as newGroupForecastByDay } from "../../utils/forecast";
import type { ForecastData, DayForecast } from "./types";
import { ru } from "date-fns/locale";

export function groupForecastByDay(
  raw: ForecastData,
  locale: typeof ru | undefined = undefined
): DayForecast[] {
  return newGroupForecastByDay(raw, locale);
}
