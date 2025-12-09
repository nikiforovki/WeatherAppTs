import { useQuery } from '@tanstack/react-query';
import { getWeatherByCoords } from '../api/weather';
import { QUERY_KEYS } from '../constants';

export function useWeatherByCoords(lat?: number, lon?: number) {
    const enabled = typeof lat === 'number' && typeof lon === 'number';

    return useQuery({
        queryKey: [QUERY_KEYS.WEATHER_BY_COORDS, lat, lon],
        queryFn: () => {
            if (!enabled) {
                throw new Error('Координаты не заданы');
            }
            return getWeatherByCoords(lat!, lon!);
        },
        enabled,
    });
}














// import { useQuery } from "@tanstack/react-query";
// import { getWeatherByCoords } from "../api/weather";
//
//
// export function useWeatherByCoords(lat?:number, lon?:number) {
//     const enabled = typeof lat === 'number' && typeof lon === 'number';
//
//     return useQuery({
//         queryKey: ['weather', 'coords', lat, lon],
//         queryFn: () => {
//             if (!enabled) {
//                 throw new Error('Координаты не заданы');
//             }
//             return getWeatherByCoords(lat!, lon!);
//
//         },
//         enabled,
//     })
// }