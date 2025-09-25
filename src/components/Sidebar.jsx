import StatusCard from './StatusCard';
import { motion } from 'framer-motion';
import { MapPin, RefreshCw } from 'lucide-react';

const Sidebar = ({ statusData, days }) => {
  const today = days ? days[0] : null;
  const enhancedStatusData = statusData ? {
    ...statusData,
    sunrise: today ? today.sunrise : null,
    sunset: today ? today.sunset : null,
  } : null;

  return (
    <motion.aside 
      className="glass rounded-2xl p-6 flex flex-col gap-6 h-full glass-hover"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold temp-gradient">WeatherWise</h2>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <RefreshCw className="w-5 h-5 text-white" />
        </button>
      </div>
      {enhancedStatusData && <StatusCard statusData={enhancedStatusData} />}
      <div className="mt-auto flex items-center gap-2 p-3 rounded-xl bg-white/5">
        <MapPin className="w-5 h-5 text-white/70" />
        <p className="text-sm text-white/70">Powered by Visual Crossing & Google Maps</p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
