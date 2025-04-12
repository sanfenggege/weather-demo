import React, { Suspense, useState, useCallback } from 'react';
import './App.css';
import { ILocationData, IWeatherData } from './types';
import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';

const DEFAULT_CITY: ILocationData = {
  name: '上海',
  id: '101020100',
  adm2: '上海',
  adm1: '上海'
};

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<ILocationData>(DEFAULT_CITY);

  const { weatherData, error, fetchWeatherData } = useWeather(selectedLocation.id);

  const handleLocationSelect = (location: ILocationData) => {
    setSelectedLocation(location);
    fetchWeatherData(location.id);
  };

  const renderWeatherCards = useCallback((data: IWeatherData[]) => (
    data.map((day) => (
      <WeatherCard
        key={`${day.fxDate}-${selectedLocation.id}`}
        day={day}
      />
    ))
  ), [selectedLocation.id]);

  return (
    <div className="app">
      <h1>城市7天天气预报</h1>
      <CitySearch handleLocationSelect={handleLocationSelect} />
      <Suspense fallback={<div className="loading">加载中...</div>}>
        {error ? (<div className="error">{error}</div>) : (
          <>
            <h2>{selectedLocation.adm2}, {selectedLocation.adm1}</h2>
            <div className="weather-container">
              {weatherData && renderWeatherCards(weatherData)}
            </div>
          </>)}
      </Suspense>
    </div>
  );
};

export default App;