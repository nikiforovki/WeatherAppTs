import styles from './index.module.css';
import { useForecast } from '../../hooks/useForecast.ts';
import { useForecastByCoords } from '../../hooks/useForecastByCoords.ts';

type Coords = { lat: number; lon: number } | null;

type ForecastProps = {
    city: string;
    coords: Coords;
    useGeo: boolean;
};

export default function WeatherWidget({ city, coords, useGeo }: ForecastProps) {
    const cityQuery = useForecast(city);
    const coordsQuery = useForecastByCoords(coords?.lat, coords?.lon);
    const data = useGeo ? coordsQuery.data : cityQuery.data;
    const isLoading = useGeo ? coordsQuery.isLoading : cityQuery.isLoading;
    const isError = useGeo ? coordsQuery.isError : cityQuery.isError;
    const error = useGeo ? coordsQuery.error : cityQuery.error;

    if (isLoading) {
        return <div>Загрузка прогноза...</div>;
    }

    if (isError || !data) {
        return (
            <div>
                Ошибка при загрузке прогноза: {(error as Error)?.message}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {data.map((day) => (
                <div key={day.date} className={styles.cart}>
                    <span className={styles.title}>
                        {day.weekday}, {day.date}
                    </span>

                    <div className={styles.tempRow}>
                        <span className={styles.tempCard}>{day.temp}°</span>

                        <img
                            className={styles.icon}
                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt={day.description}
                        />
                    </div>

                    <div className={styles.descriptionCard}>
                        {day.description}
                    </div>
                </div>
            ))}
        </div>
    );
}
