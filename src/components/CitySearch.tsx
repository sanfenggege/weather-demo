import React, { useState, useRef } from 'react';
import { ILocationData } from '../types';
import useLocation from '../hooks/useLocation';

interface CitySearchProps {
  handleLocationSelect: (location: ILocationData) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ handleLocationSelect }) => {
  const { locationSuggestions, fetchLocationSuggestions, clearLocationSuggestions } = useLocation();

  const [city, setCity] = useState<string>('上海');
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setCity(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value.length > 1) {
        fetchLocationSuggestions(value);
      } else {
        clearLocationSuggestions();
      }
    }, 500);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="搜索城市..."
        className="search-input"
      />
      {locationSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {locationSuggestions.map((location, index) => (
            <li
              key={index}
              onClick={() => {
                clearLocationSuggestions();
                handleLocationSelect(location);
              }}
              className="suggestion-item"
            >
              {location.adm2}, {location.adm1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;