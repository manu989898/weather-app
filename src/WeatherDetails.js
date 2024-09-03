import React from 'react';
import { WiStrongWind, WiRaindrop, WiBarometer, WiThermometer } from 'react-icons/wi';
import './WeatherDetails.css';

const WeatherDetails = ({ windSpeed, humidity, pressure, feelsLike }) => {
  return (
    <div className="weather-details">
      <div className="weather-detail">
        <WiStrongWind size={24} className="text-blue-500" />
        <span>Wind Speed: {windSpeed} m/s</span>
      </div>
      <div className="weather-detail">
        <WiRaindrop size={24} className="text-blue-500" />
        <span>Humidity: {humidity}%</span>
      </div>
      <div className="weather-detail">
        <WiBarometer size={24} className="text-blue-500" />
        <span>Pressure: {pressure} hPa</span>
      </div>
      <div className="weather-detail">
        <WiThermometer size={24} className="text-blue-500" />
        <span>Feels Like: {feelsLike}°C</span>
      </div>
    </div>
  );
};

export default WeatherDetails;
