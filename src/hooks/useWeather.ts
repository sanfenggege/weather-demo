import { useState, useEffect } from 'react';
import axios from 'axios';
import { IWeatherData } from '../types';

const API_HOST = import.meta.env.VITE_HEWEATHER_API_HOST;
const API_TOKEN = import.meta.env.VITE_HEWEATHER_TOKEN;

const useWeather = (initialCity: string) => {
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (locationId: string) => {
    setError(null);
    try {
      const response = await axios.get(
        `${API_HOST}/v7/weather/7d?location=${locationId}`,
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      );

      if (response.data.code === '200') {
        setWeatherData(response.data.daily);
      } else {
        setError('获取天气数据失败: ' + response.data.code);
      }
    } catch (err) {
      setError('获取天气数据失败，请稍后重试');
      console.error('获取天气数据失败:', err);
    }
  };

  useEffect(() => {
    fetchWeatherData(initialCity);
    return () => { };
  }, []);

  return { weatherData, error, fetchWeatherData };
}

export default useWeather;