import styles from './index.module.css'
import { useWeather } from '../../hooks/useWeather.ts';
import { format } from 'date-fns';
import { ru } from "date-fns/locale";

type FooterProps = {
    city: string;
};

const LS_KEY = 'favoriteCities';

type FavoriteCity = {
    id: string;
    name: string;
    country: string;
}


export default function Today({ city }: FooterProps) {
    const { data, isLoading, isError, error } = useWeather(city);

    if (isLoading) {
        return <div>Загрузка погодных данных...</div>;
    }

    if (isError) {
        return <div>Ошибка: {(error as Error).message}</div>;
    }

    if (!data) return null;

    const temp = data.main?.temp;
    const roundedTemp = typeof temp === 'number' ? Math.round(temp) : null;


    const location = data.name;
    console.log(location);
    const country = data.sys?.country;
    console.log(country);


    const date = new Date();
    const weekdayRaw = format(date, "EEEE", { locale: ru });
    const weekday = weekdayRaw.charAt(0).toUpperCase() + weekdayRaw.slice(1);
    const fullDate = format(date, "d MMMM yyyy", { locale: ru });


    const handleAddToFavorites = () => {
        if (!location || !country) return;

        const favorite: FavoriteCity = {
            id: `${location},${country}`,
            name: location,
            country,
    }

        try {
            const stored = localStorage.getItem(LS_KEY);
            let list: FavoriteCity[] = [];

            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    list = parsed;
                }
            }

            const exists = list.some((item) => item.id === favorite.id);
            if (exists) {
                return;
            }

            const updated = [...list, favorite];
            localStorage.setItem(LS_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Ошибка работы с localStorage', e);
        }
    };


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Today</h1>
            <span className={styles.title2}>{weekday}</span>
            <span className={styles.title2}>{fullDate}</span>
            <span className={styles.gradus}>{roundedTemp}°</span>
            <div className={styles.boxLocation}>
                <img src='../.././../public/icons/location-Map.svg' alt='location'
                     width={24}
                     height={24}
                />
                <span className={styles.country}>{country}</span>
                <div>|</div>
                <span className={styles.title2}>{location}</span>
            </div>
            <button className={styles.btn} onClick={handleAddToFavorites}>
                Добавить в избранное
            </button>
        </div>
    );
}
