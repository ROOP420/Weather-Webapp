import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <div className="flex flex-col items-center">
        {/* Beautiful spinner */}
        <motion.div
          className="w-16 h-16 border-4 border-white/20 border-t-indigo-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* Loading text */}
        <motion.p
          className="mt-6 text-xl font-semibold text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Weather Data...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
