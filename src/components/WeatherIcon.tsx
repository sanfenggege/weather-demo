
import React from 'react';
import { IWeatherIconProps } from '../types';

const WeatherIcon: React.FC<IWeatherIconProps> = ({ iconCode, altText, className }) => {
  const [src, setSrc] = React.useState(`/icons/${iconCode}.svg`);

  return (
    <img
      src={src}
      alt={altText}
      className={className}
      onError={() => setSrc('/icons/999.svg')}
      loading="lazy"
    />
  );
};

export default React.memo(WeatherIcon);
