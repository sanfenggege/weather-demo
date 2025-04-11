import React from 'react';
import { IWeatherData } from '../types';

interface WeatherCardProps {
  day: IWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ day }) => {
  const formatDayOfWeek = (dateStr: string) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  return (
    <div className="weather-card">
      <h3>{formatDayOfWeek(day.fxDate)}</h3>
      <p>{day.fxDate}</p>
      <img
        src={`/icons/${day.iconDay}.svg`}
        alt={day.textDay}
        className="weather-icon"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/icons/999.svg';
        }}
      />
      <p className="weather-desc">{day.textDay}</p>
      <p className="weather-temp">{day.tempMax}° / {day.tempMin}°</p>
    </div>
  );
};

export default WeatherCard;