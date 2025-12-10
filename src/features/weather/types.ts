import type { ForecastData } from "../../api/weather";

export type HourlyPoint = {
  timestamp: number; // Unix ms
  timeLabel: string; // "03:00"
  temp: number; // ℃
};

export type DayForecast = {
  dateKey: string; // "2025-12-09"
  dayLabel: string; // "Вторник, 9 декабря 2025"
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
  hourly: HourlyPoint[];
};

export type { ForecastData };
