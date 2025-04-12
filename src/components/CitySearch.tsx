import React, { useState, useRef, useEffect, Suspense } from 'react';
import { ILocationData } from '../types';
import useLocation from '../hooks/useLocation';

interface ICitySearchProps {
  handleLocationSelect: (location: ILocationData) => void;
  initialCity?: string;
}

const CitySearch: React.FC<ICitySearchProps> = ({
  handleLocationSelect,
  initialCity = ''
}) => {
  const {
    locationSuggestions,
    fetchLocationSuggestions,
    clearLocationSuggestions,
    error,
  } = useLocation();

  const [city, setCity] = useState<string>(initialCity);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setCity(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value.length >= 1) {
        fetchLocationSuggestions(value);
      } else {
        clearLocationSuggestions();
      }
    }, 300);
  };

  const handleLocationChange = (location: ILocationData) => {
    const displayName = `${location.adm2}, ${location.adm1}`;
    setCity(displayName);
    clearLocationSuggestions();
    handleLocationSelect(location);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent, location: ILocationData) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleLocationChange(location);
    }
  };

  const shouldShowSuggestions = isFocused && locationSuggestions.length > 0;

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        value={city}
        onChange={handleCityChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // 延迟以允许点击选项
        placeholder="搜索城市..."
        className="search-input"
        aria-autocomplete="list"
        aria-controls="city-suggestions"
      />

      <Suspense fallback={<div className="loading-indicator">加载中...</div>}>
        {error && <div className="error-message">{error}</div>}

        {shouldShowSuggestions && (
          <ul
            id="city-suggestions"
            className="suggestions-list"
            role="listbox"
          >
            {locationSuggestions.map((location) => (
              <li
                key={`${location.id}-${location.adm2}`}
                onClick={() => handleLocationChange(location)}
                onKeyDown={(e) => handleKeyDown(e, location)}
                className="suggestion-item"
                role="option"
                tabIndex={0}
              >
                {location.adm2}, {location.adm1}
              </li>
            ))}
          </ul>
        )}
      </Suspense>
    </div>
  );
};

export default CitySearch;