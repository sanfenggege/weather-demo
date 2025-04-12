import React, { Suspense } from 'react';
import { IWeatherData } from '../types';

interface IWeatherCardProps {
  day: IWeatherData;
}

const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const formatDayOfWeek = (dateStr: string) => {
  const date = new Date(dateStr);
  return daysOfWeek[date.getDay()];
};

const preloadIcon = (iconCode: string) => {
  const img = new Image();
  img.src = `/icons/${iconCode}.svg`;
};

const WeatherIconComponent = React.lazy(() => import('./WeatherIcon'));

const WeatherCard: React.FC<IWeatherCardProps> = ({ day }) => {
  React.useEffect(() => {
    preloadIcon(day.iconDay);
    preloadIcon('999');
  }, [day.iconDay]);

  return (
    <article
      className="weather-card"
      aria-label={`${formatDayOfWeek(day.fxDate)}的天气情况`}
    >
      <header className="weather-card-header">
        <h3>{formatDayOfWeek(day.fxDate)}</h3>
        <time dateTime={day.fxDate}>{day.fxDate}</time>
      </header>

      <Suspense fallback={<div className="weather-icon-placeholder" />}>
        <WeatherIconComponent
          iconCode={day.iconDay}
          altText={day.textDay}
          className="weather-icon"
        />
      </Suspense>

      <p className="weather-desc" aria-label="天气描述">{day.textDay}</p>
      <p className="weather-temp" aria-label="温度范围">
        <span className="temp-max">{day.tempMax}°</span>
        <span>/</span>
        <span className="temp-min">{day.tempMin}°</span>
      </p>
    </article>
  );
};

export default React.memo(WeatherCard);