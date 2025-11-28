import styles from './index.module.css'
import { useForecast } from '../../hooks/useForecast.ts';

type ForecastProps = {
    city: string;
};

export default function WeatherWidget({ city }: ForecastProps) {
    const { data, isLoading, isError, error } = useForecast(city);

    if (isLoading) {
        return <div>Загрузка прогноза...</div>;
    }

    if (isError || !data) {
        return <div>Ошибка при загрузке прогноза: {(error as Error)?.message}</div>;
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
