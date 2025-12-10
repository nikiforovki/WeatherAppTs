import { useEffect } from "react";
import { HourlyTemperatureChart } from "./HourlyTemperatureChart";
import type { DayForecast } from "../types";

type Props = {
  day: DayForecast;
  locationLabel: string;
  onClose: () => void;
};

export function HourlyTemperatureModal({ day, locationLabel, onClose }: Props) {
  // Подготовка данных для графика
  const chartData = day.hourly.map((p) => ({
    time: p.timeLabel,
    temp: p.temp,
  }));

  // Обработка закрытия по клавише Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Определение минимальной и максимальной температуры за день
  const minTemp = Math.min(...day.hourly.map((p) => p.temp));
  const maxTemp = Math.max(...day.hourly.map((p) => p.temp));

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 5px 0", fontSize: "1.5em" }}>
              {day.dayLabel}
            </h2>
            <p style={{ margin: "0", color: "#666" }}>{locationLabel}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5em",
              cursor: "pointer",
              padding: "5px",
            }}
            aria-label="Закрыть модальное окно"
          >
            &times;
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          {chartData.length > 0 ? (
            <HourlyTemperatureChart data={chartData} />
          ) : (
            <p>Нет почасовых данных для этого дня.</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <p style={{ margin: "5px 0" }}>
              Мин. температура: <strong>{minTemp}°C</strong>
            </p>
            <p style={{ margin: "5px 0" }}>
              Макс. температура: <strong>{maxTemp}°C</strong>
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
