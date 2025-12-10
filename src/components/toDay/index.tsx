import { useState } from "react";
import styles from "./index.module.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { FavoriteCity, TodayProps } from "./type";
import { LS_KEYS } from "../../constants";
import { useWeather } from "../../hooks/useWeather";
import { useWeatherByCoords } from "../../hooks/useWeatherByCoords";

export default function Today({
  city,
  coords,
  useGeo,
  onGeoSelect,
}: TodayProps) {
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

  // Оставляем данные как есть, так как useWeather возвращает данные о текущей погоде, а не прогноз по дням
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      console.error("Геолокация не поддерживается браузером");
      setGeoError("Геолокация не поддерживается вашим браузером");
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
      (error) => {
        console.error("Ошибка геолокации:", {
          code: error.code,
          message: error.message,
        });

        switch (error.code) {
          case error.PERMISSION_DENIED:
            // пользователь запретил — переключаемся на ввод города
            setGeoError("Доступ к геолокации запрещён пользователем");
            break;
          case error.POSITION_UNAVAILABLE:
            // информация о местоположении недоступна
            setGeoError("Информация о местоположении недоступна");
            break;
          case error.TIMEOUT:
            // таймаут ожидания геолокации
            setGeoError("Время ожидания определения местоположения истекло");
            break;
          default:
            setGeoError("Не удалось определить местоположение");
        }
        setIsGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  };

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
        </h1>
        <div
          className={`${styles.title2} ${styles.skeleton} ${styles.skeletonSubTitle}`}
        ></div>
        <div
          className={`${styles.title2} ${styles.skeleton} ${styles.skeletonSubTitle}`}
        ></div>
        <div
          className={`${styles.gradus} ${styles.skeleton} ${styles.skeletonTemp}`}
        ></div>

        <div className={styles.boxLocation}>
          <div className={`${styles.skeleton} ${styles.skeletonIcon}`}></div>
          <div
            className={`${styles.country} ${styles.skeleton} ${styles.skeletonText}`}
          ></div>
          <div>|</div>
          <div
            className={`${styles.title2} ${styles.skeleton} ${styles.skeletonText}`}
          ></div>
        </div>

        <div
          className={`${styles.btnGeo} ${styles.skeleton} ${styles.skeletonButton}`}
        ></div>
        <div
          className={`${styles.btn} ${styles.skeleton} ${styles.skeletonButton}`}
        ></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        Ошибка: {(error as Error)?.message || "Не удалось загрузить погоду"}
      </div>
    );
  }

  const temp = data?.main?.temp;
  const roundedTemp = typeof temp === "number" ? Math.round(temp) : null;

  const location = data?.name;
  const country = data?.sys?.country;

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
      const stored = localStorage.getItem(LS_KEYS.FAVORITE_CITIES);
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
      localStorage.setItem(LS_KEYS.FAVORITE_CITIES, JSON.stringify(updated));
    } catch (e) {
      console.error("Ошибка работы с localStorage", e);
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
          src="../.././../public/icons/location-Map.svg"
          alt="location"
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

      {geoError && <div className={styles.error}>{geoError}</div>}

      <button className={styles.btn} onClick={handleAddToFavorites}>
        Добавить в избранное
      </button>
    </div>
  );
}
