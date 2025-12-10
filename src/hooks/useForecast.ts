import { useQuery } from "@tanstack/react-query";
import { getForecast } from "../api/weather";
import { normalizeForecast } from "../utils/forecast";
import type { DailyForecast } from "../utils/type";
import { QUERY_KEYS } from "../constants";

export function useForecast(city: string) {
  return useQuery<DailyForecast[]>({
    queryKey: [QUERY_KEYS.FORECAST, city],
    queryFn: async () => {
      const raw = await getForecast(city);
      return normalizeForecast(raw);
    },
    enabled: !!city,
  });
}
