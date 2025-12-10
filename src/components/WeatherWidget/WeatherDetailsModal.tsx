import { useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./index.module.css";
import { HourlyTemperatureChart } from "../../features/weather/components/HourlyTemperatureChart";
import type { DayForecast } from "../../features/weather/types";

type WeatherDetailsModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  dayData: DayForecast | null;
  locationLabel: string;
  onClose: () => void;
};

export function WeatherDetailsModal({
  isOpen,
  isLoading,
  dayData,
  locationLabel,
  onClose,
}: WeatherDetailsModalProps) {
  // Обработка закрытия по клавише Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  if (!dayData && !isLoading) {
    return (
      <div className={styles.modalOverlay}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <div>
              <h2 className={styles.modalTitle}>Детали погоды</h2>
              <p className={styles.modalLocation}>Нет данных за день</p>
            </div>
            <button
              onClick={onClose}
              className={styles.modalCloseButton}
              aria-label="Закрыть"
            >
              &times;
            </button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.modalErrorContent}>
              Не удалось загрузить данные
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Форматирование заголовка с использованием date-fns и русской локали
  const formattedTitle = dayData?.dateKey
    ? format(new Date(dayData.dateKey), "EEEE, d MMMM yyyy", { locale: ru })
    : "";

  // Подготовка данных для графика
  const chartData =
    dayData?.hourly.map((p) => ({
      time: p.timeLabel, // уже в формате HH:mm из groupForecastByDay
      temp: p.temp,
    })) || [];

  // Определение минимальной и максимальной температуры за день
  const minTemp = dayData?.hourly.length
    ? Math.min(...dayData.hourly.map((p) => p.temp))
    : null;
  const maxTemp = dayData?.hourly.length
    ? Math.max(...dayData.hourly.map((p) => p.temp))
    : null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            {dayData ? (
              <h2 className={styles.modalTitle}>{formattedTitle}</h2>
            ) : (
              <h2 className={styles.modalTitle}>Детали погоды</h2>
            )}
            <p className={styles.modalLocation}>{locationLabel}</p>
          </div>
        </div>

        <div className={styles.modalBody}>
          {isLoading ? (
            <div className={styles.modalLoadingContent}>Загрузка данных...</div>
          ) : dayData ? (
            <>
              <div className={styles.chartContainer}>
                {chartData.length > 0 ? (
                  <HourlyTemperatureChart data={chartData} />
                ) : (
                  <p>Нет почасовых данных</p>
                )}
              </div>

              <div className={styles.tempInfo}>
                <div className={styles.tempRange}>
                  <p className={styles.tempItem}>
                    Мин. темп.: <strong>{minTemp}°C</strong>
                  </p>
                  <p className={styles.tempItem}>
                    Макс. темп.: <strong>{maxTemp}°C</strong>
                  </p>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  onClick={onClose}
                  className={styles.modalCloseButtonAction}
                >
                  Закрыть
                </button>
              </div>
            </>
          ) : (
            <div className={styles.modalErrorContent}>
              Не удалось загрузить данные
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
