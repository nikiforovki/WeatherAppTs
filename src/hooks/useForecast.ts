import { useQuery } from '@tanstack/react-query';
import { getForecast } from '../api/weather';
import { normalizeForecast } from '../utils/normalizeForecast.ts';
import type { DailyForecast } from '../utils/normalizeForecast';

export function useForecast(city: string) {
    return useQuery<DailyForecast[]>({
        queryKey: ['forecast', city],
        queryFn: async () => {
            const raw = await getForecast(city);
            return normalizeForecast(raw);
        },
        enabled: !!city,
    });
}


