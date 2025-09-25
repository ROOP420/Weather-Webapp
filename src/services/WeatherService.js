const API_KEY = import.meta.env.VITE_VIRTUALCROSSING_WEATHER_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export const fetchWeatherData = async (location) => {
  const url = `${BASE_URL}${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    console.log(data); // Log the fetched data for debugging
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Example usage:
// fetchWeatherData('New York')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));