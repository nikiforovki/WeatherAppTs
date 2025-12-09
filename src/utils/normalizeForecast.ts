import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  FORECAST_DAYS_LIMIT,
  FORECAST_TARGET_TIME,
  FORECAST_WEEKDAY_FORMAT,
  FORECAST_DATE_FORMAT,
} from "../constants";

import type { DailyForecast, ForecastListItem, ForecastResponse } from "./type"


export function normalizeForecast(data: ForecastResponse): DailyForecast[] {
  const byDate: Record<string, ForecastListItem[]> = {};

  data.list.forEach((item: ForecastListItem) => {
    const dateStr = item.dt_txt.slice(0, 10);
    if (!byDate[dateStr]) byDate[dateStr] = [];
    byDate[dateStr].push(item);
  });

  const days = Object.keys(byDate)
    .sort()
    .slice(0, FORECAST_DAYS_LIMIT)
    .map((dateStr) => {
      const items = byDate[dateStr];
      const target =
        items.find((i) => i.dt_txt.includes(FORECAST_TARGET_TIME)) ?? items[0];

      const dateObj = new Date(target.dt * 1000);

      const weekdayRaw = format(dateObj, FORECAST_WEEKDAY_FORMAT, {
        locale: ru,
      });
      const weekday = weekdayRaw.charAt(0).toUpperCase() + weekdayRaw.slice(1);

      return {
        date: format(dateObj, FORECAST_DATE_FORMAT, { locale: ru }),
        weekday,
        temp: Math.round(target.main.temp),
        icon: target.weather[0].icon,
        description: target.weather[0].description,
      };
    });

  console.log("Сколько дней после нормализации:", days.length);

  return days;
}
