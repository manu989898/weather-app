import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiCloud, WiRain, WiStrongWind, WiRaindrop, WiBarometer, WiThermometer  } from 'react-icons/wi';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('New York');
  const [error, setError] = useState(null);

  const API_KEY = 'e759623002aac3571a8477f4d907d910';

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (err) {
      setError('Error fetching data');
      setWeatherData(null);
    }
  };

 

  

  const getWeatherIcon = () => {
    if (!weatherData) return null;
    const main = weatherData.weather[0].main.toLowerCase();
    switch (main) {
      case 'clear':
        return (
          <div className="weather-icon-container">
            <WiDaySunny size={150} className="text-yellow-500 spin" />
          </div>
        );
      case 'clouds':
        return (
          <div className="weather-icon-container">
            <WiCloud size={150} className="text-gray-500 move-cloud" />
          </div>
        );
      case 'rain':
        return (
          <div className="weather-icon-container">
            <WiRain size={150} className="text-blue-500 falling-rain" />
          </div>
        );
      default:
        return (
          <div className="weather-icon-container">
            <WiCloud size={150} className="text-gray-500 move-cloud" />
          </div>
        );
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900">Weather App</h1>
        <div className="mt-6">
          <input
            type="text"
            className="w-full p-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-full text-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={getWeather}
        >
          Get Weather
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {weatherData && (
          <div className="mt-8 text-center">
            {getWeatherIcon()}
            <h2 className="text-4xl font-semibold mt-4 text-gray-900">{weatherData.name}</h2>
            <p className="text-6xl font-light text-gray-800 mt-2">{weatherData.main.temp}°C</p>
            <p className="text-lg text-gray-600 mt-1 capitalize">{weatherData.weather[0].description}</p>
            <div className="mt-6 text-left text-gray-600">
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <p>Feels Like: {weatherData.main.feels_like}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
