import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Cloud, ThermometerSun, Wind, Droplets, Download } from 'lucide-react'
import html2canvas from 'html2canvas'

const CurrentWeatherCard = ({ data }) => {
  const { resolvedAddress, currentConditions, days, description } = data;
  const today = days[0];
  const cardRef = useRef(null);

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'current-weather.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const getWeatherIcon = (condition) => {
    // Simple mapping; can be expanded
    if (condition.includes('cloud')) return <Cloud className="w-20 h-20 text-white/80" />;
    if (condition.includes('rain')) return <Droplets className="w-20 h-20 text-white/80" />;
    return <ThermometerSun className="w-20 h-20 text-white/80" />;
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass rounded-2xl p-6 text-left glass-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold temp-gradient">{resolvedAddress}</h2>
          <p className="font-light text-white/70">{new Date().toDateString()}</p>
        </div>
        <button
          onClick={downloadCard}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="Download Weather Card"
        >
          {/* <Download className="w-5 h-5 text-white" /> */}
        </button>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {getWeatherIcon(currentConditions.icon)}
          <div>
            <p className="text-8xl font-bold text-white">{Math.round(currentConditions.temp)}</p>
            <p className="text-2xl font-light text-white/70">°C</p>
            <p className="text-lg font-medium text-white/80">Feels like {Math.round(currentConditions.feelslike)}°C</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-light text-white/70">High: {Math.round(today.tempmax)}°C</p>
          <p className="font-light text-white/70">Low: {Math.round(today.tempmin)}°C</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
          <Wind className="w-6 h-6 mb-1 text-white/70" />
          <p className="text-sm font-light text-white/70">Wind</p>
          <p className="text-lg font-bold">{Math.round(currentConditions.windspeed)} km/h</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
          <Droplets className="w-6 h-6 mb-1 text-white/70" />
          <p className="text-sm font-light text-white/70">Humidity</p>
          <p className="text-lg font-bold">{currentConditions.humidity}%</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
          <div className="w-6 h-6 mb-1 text-white/70">☀️</div>
          <p className="text-sm font-light text-white/70">UV Index</p>
          <p className="text-lg font-bold">{currentConditions.uvindex}</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/5">
          <div className="w-6 h-6 mb-1 text-white/70">🌧️</div>
          <p className="text-sm font-light text-white/70">Precip</p>
          <p className="text-lg font-bold">{currentConditions.precipprob}%</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl font-light text-white/90">{description}</p>
      </div>
    </motion.div>
  );
};

export default CurrentWeatherCard;