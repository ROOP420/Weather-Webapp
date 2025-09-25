import SearchBar from './components/SearchBar'
import CurrentWeatherCard from './components/CurrentWeatherCard'
import Loading from './components/Loading'
import { useWeather } from './hooks/useWeather'
import { useEffect } from 'react'
import DynamicBackground from './components/DynamicBackground'
import Sidebar from './components/Sidebar'
import ForecastChart from './components/ForecastChart'


function App() {
  const {weatherData, loading, error, getWeather} = useWeather();

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return `${lat},${lng}`; // Fallback to lat,long if no address
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `${lat},${lng}`;
    }
  };

  useEffect(() => {
    const initLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const address = await reverseGeocode(latitude, longitude);
            getWeather(address);
          },
          () => {
            // Fallback to a default location if permission is denied
            getWeather('New York');
          }
        );
      } else {
        // Geolocation not supported by the browser
        getWeather('New York');
      }
    };

    initLocation();
  }, [getWeather]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <DynamicBackground condition={weatherData?.currentConditions.icon} />
      <div className="min-h-screen text-white p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          {weatherData && <Sidebar statusData={weatherData.currentConditions} days={weatherData.days} />}
        </div>
        <main className="lg:col-span-3 flex flex-col  justify-center gap-4">
          <SearchBar onSearch={getWeather} />
          {error && <p className="text-xl text-red-500 text-center">Error: {error}</p>}
          {weatherData && (
            <>
              <CurrentWeatherCard data={weatherData} />
              <div className="glass rounded-2xl p-6">
                <ForecastChart days={weatherData.days} />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default App
