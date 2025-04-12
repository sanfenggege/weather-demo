import { useState, useEffect, useCallback, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { IWeatherData } from '../types';

const WEATHER_API_CONFIG = {
  HOST: import.meta.env.VITE_HEWEATHER_API_HOST,
  TOKEN: import.meta.env.VITE_HEWEATHER_TOKEN,
  ENDPOINTS: {
    WEATHER_7D: '/v7/weather/7d',
  },
};

interface IWeatherApiResponse {
  code: string;
  daily?: IWeatherData[];
  message?: string;
}

const useWeather = (initialCity: string) => {
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const fetchWeatherData = useCallback(async (locationId: string) => {
    if (!locationId) {
      setError('位置ID不能为空');
      return;
    }

    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request');
    }

    try {
      setIsLoading(true);
      setError(null);

      cancelTokenSource.current = axios.CancelToken.source();

      const response = await axios.get<IWeatherApiResponse>(
        `${WEATHER_API_CONFIG.HOST}${WEATHER_API_CONFIG.ENDPOINTS.WEATHER_7D}`,
        {
          params: { location: locationId },
          headers: {
            'Authorization': `Bearer ${WEATHER_API_CONFIG.TOKEN}`
          },
          cancelToken: cancelTokenSource.current.token
        }
      );

      if (response.data.code === '200' && response.data.daily) {
        setWeatherData(response.data.daily);
      } else {
        setError(response.data.message || `获取天气数据失败: ${response.data.code}`);
        setWeatherData([]);
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        const errorMessage = axios.isAxiosError(err)
          ? '网络错误，请检查连接'
          : '获取天气数据失败，请稍后重试';

        setError(errorMessage);
        console.error('获取天气数据失败:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCity) {
      fetchWeatherData(initialCity);
    }

    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('Component unmounted');
      }
    };
  }, [initialCity, fetchWeatherData]);

  return {
    weatherData,
    error,
    isLoading,
    fetchWeatherData
  };
}

export default useWeather;