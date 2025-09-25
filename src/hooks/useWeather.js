import {useState, useCallback}  from 'react';
import {fetchWeatherData} from '../services/WeatherService';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    loading,
    error,
    getWeather,
  };
}