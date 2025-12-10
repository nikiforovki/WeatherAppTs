import type { DailyForecast } from "../../../utils/type";

interface DailyForecastCardProps {
  day: DailyForecast;
  onClick: () => void;
}

const DailyForecastCard = ({ day, onClick }: DailyForecastCardProps) => {
  return (
    <div className="forecast-card" onClick={onClick}>
      <span className="forecast-title">
        {day.weekday}, {day.date}
      </span>

      <div className="forecast-temp-row">
        <span className="forecast-temp">{day.temp}°</span>
        <img
          className="forecast-icon"
          src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
          alt={day.description}
        />
      </div>

      <div className="forecast-description">{day.description}</div>
    </div>
  );
};

export default DailyForecastCard;
