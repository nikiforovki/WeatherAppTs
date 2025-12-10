// Deprecated: Use normalizeForecast from src/utils/forecast instead
// This file is kept for backward compatibility
import { normalizeForecast as newNormalizeForecast } from "./forecast";
import type { DailyForecast, ForecastResponse } from "./type";

export function normalizeForecast(data: ForecastResponse): DailyForecast[] {
  // Using the new unified function
  return newNormalizeForecast(data);
}
