import { useState, useMemo, useRef } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { ILocationData } from '../types';

const LOCATION_API_CONFIG = {
  BASE_URL: '',
  ENDPOINTS: {
    CITY_LOOKUP: '/api/geo/v2/city/lookup',
  },
  TOKEN: import.meta.env.VITE_HEWEATHER_TOKEN,
};

interface ILocationApiResponse {
  code: string;
  location: ILocationData[];
  message?: string;
}

const useLocation = () => {
  const [locationSuggestions, setLocationSuggestions] = useState<ILocationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchLocationSuggestions = async (query: string) => {
    if (!query.trim()) {
      clearLocationSuggestions();
      return;
    }

    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request');
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        cancelTokenSource.current = axios.CancelToken.source();

        const response = await axios.get<ILocationApiResponse>(
          LOCATION_API_CONFIG.ENDPOINTS.CITY_LOOKUP,
          {
            params: { location: query },
            headers: {
              'Authorization': `Bearer ${LOCATION_API_CONFIG.TOKEN}`
            },
            baseURL: LOCATION_API_CONFIG.BASE_URL,
            cancelToken: cancelTokenSource.current.token
          }
        );

        if (response.data.code === '200') {
          setLocationSuggestions(response.data.location || []);
        } else {
          setError(response.data.message || 'Failed to fetch location suggestions');
          setLocationSuggestions([]);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('获取城市列表失败:', err);
          setError('Failed to fetch location suggestions');
          setLocationSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const clearLocationSuggestions = () => {
    setLocationSuggestions([]);
    setError(null);
  };

  useMemo(() => () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Component unmounted');
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  }, []);

  const actions = useMemo(() => ({
    fetchLocationSuggestions,
    clearLocationSuggestions
  }), []);

  return {
    locationSuggestions,
    isLoading,
    error,
    ...actions
  };
}

export default useLocation;