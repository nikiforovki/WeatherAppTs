import { useState } from 'react';
import styles from './index.module.css'
import { useWeather } from '../../hooks/useWeather.ts';
import { useWeatherByCoords } from '../../hooks/useWeatherByCoords.ts';
import { format } from 'date-fns';
import { ru } from "date-fns/locale";

const LS_KEY = 'favoriteCities';

type FavoriteCity = {
    id: string;
    name: string;
    country: string;
};

type Coords = { lat: number; lon: number } | null;

type TodayProps = {
    city: string;
    coords: Coords;
    useGeo: boolean;
    onGeoSelect: (lat: number, lon: number) => void;
};

export default function Today({ city, coords, useGeo, onGeoSelect }: TodayProps) {
    const [geoError, setGeoError] = useState<string | null>(null);
    const [isGeoLoading, setIsGeoLoading] = useState(false);
    const {
        data: cityData,
        isLoading: isCityLoading,
        isError: isCityError,
        error: cityError,
    } = useWeather(city);
    const {
        data: coordsData,
        isLoading: isCoordsLoading,
        isError: isCoordsError,
        error: coordsError,
    } = useWeatherByCoords(coords?.lat, coords?.lon);
    const data = useGeo ? coordsData : cityData;
    const isLoading = (useGeo ? isCoordsLoading : isCityLoading) || isGeoLoading;
    const isError = useGeo ? isCoordsError : isCityError;
    const error = useGeo ? coordsError : cityError;
    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setGeoError('Геолокация не поддерживается вашим браузером');
            return;
        }

        setIsGeoLoading(true);
        setGeoError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                onGeoSelect(latitude, longitude);

                setIsGeoLoading(false);
            },
            (err) => {
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setGeoError('Доступ к геолокации запрещён пользователем');
                        break;
                    case err.POSITION_UNAVAILABLE:
                        setGeoError('Информация о местоположении недоступна');
                        break;
                    case err.TIMEOUT:
                        setGeoError('Время ожидания определения местоположения истекло');
                        break;
                    default:
                        setGeoError('Не удалось определить местоположение');
                }
                setIsGeoLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    if (isLoading) {
        return <div>Загрузка погодных данных...</div>;
    }

    if (isError || !data) {
        return (
            <div>Ошибка: {(error as Error)?.message || 'Не удалось загрузить погоду'}</div>
        );
    }

    const temp = data.main?.temp;
    const roundedTemp = typeof temp === 'number' ? Math.round(temp) : null;

    const location = data.name;
    const country = data.sys?.country;

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
        };

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
            if (exists) return;

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
                <img
                    src='../.././../public/icons/location-Map.svg'
                    alt='location'
                    width={24}
                    height={24}
                />
                <span className={styles.country}>{country}</span>
                <div>|</div>
                <span className={styles.title2}>{location}</span>
            </div>

            <button
                className={styles.btnGeo}
                type="button"
                onClick={handleDetectLocation}
            >
                Определить по локации
            </button>

            {geoError && (
                <div className={styles.error}>
                    {geoError}
                </div>
            )}

            <button className={styles.btn} onClick={handleAddToFavorites}>
                Добавить в избранное
            </button>
        </div>
    );
}
