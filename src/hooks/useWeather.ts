import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../api/weather';
import { QUERY_KEYS } from '../constants';

export function useWeather(city: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.WEATHER, city],
        queryFn: () => getWeather(city),
    });
}
















// import { useQuery } from '@tanstack/react-query';
// import { getWeather } from '../api/weather';
//
// export function useWeather(city: string) {
//     return useQuery({
//         queryKey: ['weather', city],
//         queryFn: () => getWeather(city),
//     });
// }