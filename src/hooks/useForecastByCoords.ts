import { useQuery } from '@tanstack/react-query';
import { getForecastByCoords } from '../api/weather';
import { normalizeForecast } from '../utils/normalizeForecast';
import type { DailyForecast } from '../utils/type';
import { QUERY_KEYS } from '../constants';

export function useForecastByCoords(lat?: number, lon?: number) {
    return useQuery<DailyForecast[]>({
        queryKey: [QUERY_KEYS.FORECAST_BY_COORDS, lat, lon],
        enabled: lat != null && lon != null,
        queryFn: async () => {
            if (lat == null || lon == null) {
                throw new Error('Координаты не заданы');
            }
            const raw = await getForecastByCoords(lat, lon);
            return normalizeForecast(raw);
        },
    });
}
