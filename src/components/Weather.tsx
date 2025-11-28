import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../api/weather';

type WeatherProps = {
    city: string;
};

export function Weather({ city }: WeatherProps) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['weather', city],          // ключ кеша
        queryFn: () => getWeather(city),      // функция из api/weather.ts
    });

    if (isLoading) return <div>Загрузка погоды...</div>;

    if (isError) {
        return (
            <div>
                Ошибка при загрузке погоды:{' '}
                {(error as Error).message}
            </div>
        );
    }

    const temp = data.main?.temp;
    const feelsLike = data.main?.feels_like;
    const description = data.weather?.[0]?.description;

    return (
        <div>
            <h2>Погода в {data.name}</h2>
            <p>Температура: {temp}°C</p>
            <p>Ощущается как: {feelsLike}°C</p>
            <p>Описание: {description}</p>
        </div>
    );
}