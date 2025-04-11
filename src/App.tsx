import React, { Suspense, useState } from 'react';
import './App.css';
import { ILocationData } from './types';
import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<ILocationData>({
    name: '上海',
    id: '101020100',
    adm2: '上海',
    adm1: '上海'
  });

  const { weatherData, error, fetchWeatherData } = useWeather(selectedLocation.id);

  const handleLocationSelect = (location: ILocationData) => {
    setSelectedLocation(location);
    fetchWeatherData(location.id);
  };

  return (
    <div className="app">
      <h1>城市7天天气预报</h1>
      <CitySearch handleLocationSelect={handleLocationSelect} />
      <Suspense fallback={<div className="loading">加载中...</div>}>
        {error ? (<div className="error">{error}</div>) : (
          <>
            <h2>{selectedLocation.adm2}, {selectedLocation.adm1}</h2>
            <div className="weather-container">
              {weatherData.map((day, index) => (
                <WeatherCard key={index} day={day} />
              ))}
            </div>
          </>)}
      </Suspense>
    </div>
  );
};

export default App;