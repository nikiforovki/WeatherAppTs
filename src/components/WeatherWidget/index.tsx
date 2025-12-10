import styles from "./index.module.css";
import { useState, useEffect } from "react";
import { WeatherDetailsModal } from "./WeatherDetailsModal";
import { getForecast, getForecastByCoords } from "../../api/weather";
import { normalizeForecast } from "../../utils/normalizeForecast";
import type { ForecastProps } from "./type";
import type { DailyForecast } from "../../utils/type";
import type { ForecastData } from "../../api/weather";

export default function WeatherWidget({ city, coords, useGeo }: ForecastProps) {
  const [dayForecastData, setDayForecastData] = useState<
    DailyForecast[] | null
  >(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [rawForecastData, setRawForecastData] = useState<ForecastData | null>(
    null
  );
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Загружаем данные для отображения карточек дней при инициализации компонента
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        let rawData;
        if (useGeo && coords) {
          rawData = await getForecastByCoords(coords.lat, coords.lon);
        } else {
          rawData = await getForecast(city);
        }
        // Используем старую функцию normalizeForecast для получения 6 дней
        const dayData = normalizeForecast(rawData);
        setDayForecastData(dayData);
      } catch (err) {
        console.error("Ошибка загрузки начальных данных прогноза:", err);
        setIsError(true);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [city, coords, useGeo]);

  useEffect(() => {
    if (selectedDay) {
      setIsModalLoading(true);
      const loadRawData = async () => {
        try {
          let rawData;
          if (useGeo && coords) {
            rawData = await getForecastByCoords(coords.lat, coords.lon);
          } else {
            rawData = await getForecast(city);
          }
          setRawForecastData(rawData);
        } catch (err) {
          console.error("Ошибка загрузки исходных данных прогноза:", err);
        } finally {
          setIsModalLoading(false);
        }
      };

      loadRawData();
    } else {
      setIsModalLoading(false);
    }
  }, [selectedDay, useGeo, coords, city]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.cart}>
            <div className={`${styles.title} ${styles.skeleton}`}></div>
            <div className={styles.tempRow}>
              <div className={`${styles.tempCard} ${styles.skeleton}`}></div>
              <div className={`${styles.icon} ${styles.skeleton}`}></div>
            </div>
            <div
              className={`${styles.descriptionCard} ${styles.skeleton}`}
            ></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError || !dayForecastData) {
    return (
      <div>Ошибка загрузки прогноза {error?.message || "Произошла ошибка"}</div>
    );
  }

  const displayData = dayForecastData || [];

  return (
    <div className={styles.container}>
      {displayData?.map((day, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        const dateKey = date.toISOString().split("T")[0];

        return (
          <div
            key={dateKey}
            className={styles.cart}
            onClick={() => {
              setSelectedDay(dateKey);
            }}
          >
            <span className={styles.title}>
              {new Date(dateKey).toLocaleDateString("ru-RU", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>

            <div className={styles.tempRow}>
              <span className={styles.tempCard}>{day.temp}°</span>

              <img
                className={styles.icon}
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
              />
            </div>

            <div className={styles.descriptionCard}>{day.description}</div>
          </div>
        );
      })}
      <WeatherDetailsModal
        isOpen={!!selectedDay}
        isLoading={isModalLoading}
        dayData={
          selectedDay && rawForecastData
            ? (() => {
                const dayData = rawForecastData.list.filter((item) => {
                  const itemDate = new Date(item.dt * 1000);
                  const selectedDate = new Date(selectedDay);
                  return (
                    itemDate.toDateString() === selectedDate.toDateString()
                  );
                });

                // Преобразуем почасовые данные для графика
                const hourly = dayData.map((item) => ({
                  timestamp: item.dt * 1000,
                  timeLabel: new Date(item.dt * 1000).toLocaleTimeString(
                    "ru-RU",
                    { hour: "2-digit", minute: "2-digit" }
                  ),
                  temp: item.main.temp,
                }));

                // Находим минимальную и максимальную температуру за день
                let minTemp = Infinity;
                let maxTemp = -Infinity;
                for (const item of dayData) {
                  if (item.main.temp < minTemp) minTemp = item.main.temp;
                  if (item.main.temp > maxTemp) maxTemp = item.main.temp;
                }

                const firstItem = dayData[0];

                return {
                  dateKey: selectedDay,
                  dayLabel: new Date(selectedDay).toLocaleDateString("ru-RU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }),
                  minTemp,
                  maxTemp,
                  icon: firstItem?.weather[0].icon || "",
                  description: firstItem?.weather[0].description || "",
                  hourly,
                };
              })()
            : null
        }
        locationLabel={
          useGeo && coords
            ? `${city}, ${coords.lat},${coords.lon}`
            : `${city}, ${rawForecastData?.city?.country || ""}`
        }
        onClose={() => {
          setSelectedDay(null);
          setRawForecastData(null);
        }}
      />
    </div>
  );
}
