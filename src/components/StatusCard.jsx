import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Droplets, Wind, Sunrise, Sunset } from 'lucide-react'

const StatusCard = ({ statusData }) => {
  const getUVColor = (uvIndex) => {
    if (uvIndex < 3) return 'uv-gauge-low';
    if (uvIndex < 6) return 'uv-gauge-moderate';
    return 'uv-gauge-high';
  };

  const UVIndexGauge = ({ uvIndex }) => {
    const maxUV = 12;
    const percentage = (uvIndex / maxUV) * 100;
    const colorClass = getUVColor(uvIndex);
    return (
      <div className="w-full">
        <div className="bg-white/10 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${colorClass}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Assuming statusData is from currentConditions, but for sunrise/sunset, need days[0] – pass from parent if needed
  // For now, use if available in statusData or skip

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="font-bold text-2xl temp-gradient">Current Status</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 glass-hover">
          <Sun className="w-8 h-8 text-yellow-400" />
          <div className="flex-1">
            <p className="text-sm font-light text-white/70">UV Index</p>
            <p className="text-3xl font-bold text-white">{statusData.uvindex}</p>
            <UVIndexGauge uvIndex={statusData.uvindex} />
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 glass-hover">
          <Droplets className="w-8 h-8 text-blue-400" />
          <div className="flex-1">
            <p className="text-sm font-light text-white/70">Humidity</p>
            <p className="text-3xl font-bold text-white">{statusData.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 glass-hover">
          <Wind className="w-8 h-8 text-white/70" />
          <div className="flex-1">
            <p className="text-sm font-light text-white/70">Wind Speed</p>
            <p className="text-3xl font-bold text-white">{statusData.windspeed} km/h</p>
          </div>
        </div>
        {/* Add sunrise/sunset if data available; assuming passed or from context */}
        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 glass-hover">
          <div className="flex items-center gap-3">
            <Sunrise className="w-6 h-6 text-orange-400" />
            <p className="text-sm font-light text-white/70">Sunrise</p>
          </div>
          <p className="text-lg font-medium text-white">{statusData.sunrise || 'N/A'}</p>
          <div className="flex items-center gap-3">
            <Sunset className="w-6 h-6 text-orange-400" />
            <p className="text-sm font-light text-white/70">Sunset</p>
          </div>
          <p className="text-lg font-medium text-white">{statusData.sunset || 'N/A'}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusCard;