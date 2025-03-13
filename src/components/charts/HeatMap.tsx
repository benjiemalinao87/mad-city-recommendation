'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeatMapProps {
  data: {
    hour: number;
    value: number;
    label?: string;
  }[];
  title?: string;
  subtitle?: string;
}

const HeatMap: React.FC<HeatMapProps> = ({
  data,
  title,
  subtitle,
}) => {
  // Calculate color intensity based on value
  const getColor = (value: number) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const intensity = value / maxValue;
    return `rgba(37, 99, 235, ${intensity * 0.8})`; // Using blue with varying opacity
  };

  // Format hour for display
  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${period}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6">
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      )}
      
      <div className="grid grid-cols-12 gap-2">
        {data.map((item, index) => (
          <motion.div
            key={item.hour}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            className="relative group"
          >
            <div
              className="
                h-12 rounded-lg transition-all duration-200
                hover:ring-2 hover:ring-blue-200 hover:ring-opacity-50
                cursor-pointer
              "
              style={{ backgroundColor: getColor(item.value) }}
            >
              {/* Tooltip */}
              <div className="
                opacity-0 group-hover:opacity-100
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                bg-white/90 backdrop-blur-sm
                px-3 py-2 rounded-lg
                border border-gray-100
                shadow-lg
                text-sm text-gray-700
                whitespace-nowrap
                transition-opacity duration-200
                z-10
              ">
                <div className="font-medium">{formatHour(item.hour)}</div>
                <div className="text-gray-500">{item.label || `Value: ${item.value}`}</div>
                {/* Arrow */}
                <div className="
                  absolute -bottom-1 left-1/2 -translate-x-1/2
                  w-2 h-2 bg-white
                  transform rotate-45
                  border-r border-b border-gray-100
                "/>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {formatHour(item.hour)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeatMap;
