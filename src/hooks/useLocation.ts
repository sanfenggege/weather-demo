import { useState } from 'react';
import axios from 'axios';
import { ILocationData } from '../types';

const API_TOKEN = import.meta.env.VITE_HEWEATHER_TOKEN;

const useLocation = () => {
  const [locationSuggestions, setLocationSuggestions] = useState<ILocationData[]>([]);

  const fetchLocationSuggestions = async (query: string) => {
    try {
      const response = await axios.get(
        '/api/geo/v2/city/lookup',
        {
          params: { location: query },
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          },
          baseURL: ''
        }
      );
      if (response.data.code === '200') {
        setLocationSuggestions(response.data.location);
      }
    } catch (err) {
      console.error('获取城市列表失败:', err);
      clearLocationSuggestions();
    }
  };

  const clearLocationSuggestions = () => {
    setLocationSuggestions([]);
  }

  return { locationSuggestions, fetchLocationSuggestions, clearLocationSuggestions };
}

export default useLocation;