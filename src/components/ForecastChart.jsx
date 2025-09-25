import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

const ForecastChart = ({ days }) => {
  const rawData = days.slice(0, 7).map(day => ({
    name: new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: Math.round(day.temp),
    humidity: day.humidity,
    precip: day.precipprob,
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayIndex = days.slice(0, 7).findIndex(day => {
    const dayDate = new Date(day.datetime);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate.getTime() === today.getTime();
  });

  let data = rawData;
  const centerIndex = 3; // For a 7-day chart, the center is index 3

  if (todayIndex !== -1 && todayIndex < centerIndex) {
    const paddingCount = centerIndex - todayIndex;
    const padding = Array(paddingCount).fill({ name: '', temp: null, humidity: null, precip: null });
    data = [...padding, ...rawData.slice(0, 7 - paddingCount)];
  }

  const todayName = todayIndex !== -1 ? rawData[todayIndex]?.name : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && label) {
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

  const customDot = (props) => {
    const { cx, cy, stroke, payload } = props;
    const isToday = todayName && payload.name === todayName;
    return (
      <circle
        key={`${payload.name}-${stroke}`}
        cx={cx}
        cy={cy}
        r={isToday ? 6 : 3}
        fill={stroke}
        stroke="white"
        strokeWidth={1}
      />
    );
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
          <CartesianGrid strokeDasharray="3 3" stroke="white" opacity={0.2} />
          <XAxis dataKey="name" stroke="white" axisLine={true} tickLine={true} tick={{ fill: 'white' }} />
          {todayName && (
            <ReferenceLine
              x={todayName}
              stroke="yellow"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ value: 'Today', position: 'top', fill: 'yellow', fontSize: 12 }}
            />
          )}
          <YAxis
            stroke="white"
            axisLine={true}
            tickLine={true}
            tick={{ fill: 'white' }}
            domain={['dataMin - 5', 'dataMax + 5']}
            yAxisId="left"
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'white' } }}
          />
          <YAxis
            orientation="right"
            stroke="white"
            axisLine={true}
            tickLine={true}
            tick={{ fill: 'white' }}
            domain={[0, 100]}
            yAxisId="right"
            label={{ value: 'Humidity / Rain (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: 'white' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: 'white' }} iconType="line" />
          <Line
            key="temp"
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={customDot}
            name="Temperature (°C)"
          />
          <Line
            key="humidity"
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#10b981"
            strokeWidth={2}
            dot={customDot}
            name="Humidity (%)"
          />
          <Line
            key="precip"
            yAxisId="right"
            type="monotone"
            dataKey="precip"
            stroke="#ef4444"
            strokeWidth={2}
            dot={customDot}
            name="Rain (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ForecastChart;
