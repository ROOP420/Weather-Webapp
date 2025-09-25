import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { motion } from 'framer-motion';

const ForecastChart = ({ days }) => {
  const data = days.slice(0, 7).map(day => ({
    name: new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: Math.round(day.temp),
    humidity: day.humidity,
    precip: day.precipprob,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg p-3 text-white">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="glass rounded-2xl p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-xl font-bold mb-4 temp-gradient">7-Day Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="white" axisLine={false} tickLine={false} tick={{ fill: 'white' }} />
          <YAxis 
            stroke="white" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'white' }} 
            domain={['dataMin - 5', 'dataMax + 5']}
            yAxisId="left"
          />
          <YAxis 
            orientation="right" 
            stroke="transparent" 
            tick={false} 
            domain={[0, 100]}
            yAxisId="right"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="temp" 
            stroke="#4f46e5" 
            strokeWidth={3} 
            dot={{ fill: '#4f46e5', strokeWidth: 2 }} 
            name="Temperature (°C)"
          />
          <Area 
            yAxisId="right" 
            type="monotone" 
            dataKey="humidity" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.3} 
            name="Humidity (%)"
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="precip" 
            stroke="#ef4444" 
            strokeWidth={2} 
            dot={false} 
            name="Precip Prob (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ForecastChart;
