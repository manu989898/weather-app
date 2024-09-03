import React, { useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const API_KEY = 'e759623002aac3571a8477f4d907d910';

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

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 bg-white rounded-3xl shadow-lg">
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
          <h2 className="text-2xl font-semibold text-gray-900">{weatherData.name}</h2>
          <p className="text-5xl font-light text-gray-800 mt-2">{weatherData.main.temp}°C</p>
          <p className="text-lg text-gray-600 mt-1 capitalize">{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
