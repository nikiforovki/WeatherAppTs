import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../api/weather';

export function useWeather(city: string) {
    return useQuery({
        queryKey: ['weather', city],
        queryFn: () => getWeather(city),
    });
}