import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  DAYS_LIMIT as FORECAST_DAYS_LIMIT,
  TARGET_TIME as FORECAST_TARGET_TIME,
  WEEKDAY_FORMAT as FORECAST_WEEKDAY_FORMAT,
  DATE_FORMAT as FORECAST_DATE_FORMAT,
} from "../constants";
import type { DailyForecast, ForecastListItem, ForecastResponse } from "./type";
import type {
  ForecastData,
  DayForecast,
  HourlyPoint,
} from "../features/weather/types";

/**
 * Преобразует прогноз в формат для отображения карточек дней
 * Использует температуру в 12:00 или ближайшее значение для каждого дня
 */
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

      const dateObj = new Date(target.dt * 100);

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

  return days;
}

/**
 * Группирует почасовые данные по дням для отображения подробного прогноза
 * Включает почасовую информацию для графиков
 */
export function groupForecastByDay(
  raw: ForecastData,
  locale: typeof ru = ru
): DayForecast[] {
  if (!raw?.list || raw.list.length === 0) {
    return [];
  }

  // Группируем почасовые данные по датам
  const grouped: Record<string, typeof raw.list> = {};

  raw.list.forEach((item) => {
    const date = new Date(item.dt * 100); // Преобразуем Unix timestamp в миллисекунды
    const dateKey = format(date, "yyyy-MM-dd");
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(item);
  });

  // Собираем массив дней
  const days = Object.keys(grouped)
    .sort()
    .slice(0, 6) // Ограничиваем 6 днями
    .map((dateKey) => {
      const items = grouped[dateKey];
      // Сортируем по времени
      items.sort((a, b) => a.dt - b.dt);

      // Находим минимальную и максимальную температуру за день
      let minTemp = Infinity;
      let maxTemp = -Infinity;

      for (const item of items) {
        if (item.main.temp < minTemp) minTemp = item.main.temp;
        if (item.main.temp > maxTemp) maxTemp = item.main.temp;
      }

      // Преобразуем почасовые данные в HourlyPoint
      const hourly: HourlyPoint[] = items.map((item) => {
        const date = new Date(item.dt * 1000);
        return {
          timestamp: date.getTime(),
          timeLabel: format(date, "HH:mm"),
          temp: item.main.temp,
        };
      });

      // Берем иконку и описание из первого элемента дня
      const firstItem = items[0];

      return {
        dateKey,
        dayLabel: format(new Date(dateKey), "EEEE, d MMMM", {
          locale,
        }),
        minTemp,
        maxTemp,
        icon: firstItem.weather[0].icon,
        description: firstItem.weather[0].description,
        hourly,
      } satisfies DayForecast;
    });

  return days;
}
