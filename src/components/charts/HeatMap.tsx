'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DayData {
  initial_message_day: string;
  response_day: string;
  response_count: number;
  avg_response_time: number;
}

interface HeatMapProps {
  data: DayData[];
  title?: string;
  subtitle?: string;
  height?: number;
}

const HeatMap: React.FC<HeatMapProps> = ({
  data,
  title,
  subtitle,
  height = 400,
}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Calculate color intensity based on value
  const getColor = (value: number) => {
    const maxValue = Math.max(...data.map(d => d.response_count));
    const intensity = value / maxValue;
    return `rgba(59, 130, 246, ${intensity * 0.7})`; // Mac OS blue with varying opacity
  };

  const getValue = (initial: string, response: string) => {
    const entry = data.find(d => 
      d.initial_message_day === initial && 
      d.response_day === response
    );
    return entry?.response_count || 0;
  };

  const getAvgTime = (initial: string, response: string) => {
    const entry = data.find(d => 
      d.initial_message_day === initial && 
      d.response_day === response
    );
    return entry?.avg_response_time || 0;
  };

  return (
    <div className="mac-card p-6">
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
      )}
      
      <div className="relative" style={{ height }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-8 bottom-8 flex flex-col justify-between">
          {days.map(day => (
            <div key={day} className="text-sm text-gray-500 pr-4">{day}</div>
          ))}
        </div>
        
        {/* X-axis labels */}
        <div className="absolute left-20 right-4 bottom-0 flex justify-between">
          {days.map(day => (
            <div key={day} className="text-sm text-gray-500 -rotate-45 origin-top-left">{day}</div>
          ))}
        </div>
        
        {/* Heatmap grid */}
        <div className="absolute left-20 top-8 right-4 bottom-8 grid grid-cols-7 grid-rows-7 gap-1">
          {days.map((initial, i) => (
            days.map((response, j) => {
              const value = getValue(initial, response);
              const avgTime = getAvgTime(initial, response);
              return (
                <motion.div
                  key={`${initial}-${response}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: (i * 7 + j) * 0.01 }}
                  className="relative group"
                >
                  <div
                    className="w-full h-full rounded-lg transition-all duration-200
                      hover:ring-2 hover:ring-blue-200 hover:ring-opacity-50
                      cursor-pointer"
                    style={{ backgroundColor: getColor(value) }}
                  >
                    {/* Tooltip */}
                    {value > 0 && (
                      <div className="opacity-0 group-hover:opacity-100
                        absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2
                        bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg
                        border border-gray-100 shadow-lg
                        text-sm whitespace-nowrap transition-opacity duration-200"
                      >
                        <div className="font-medium">{`${initial} → ${response}`}</div>
                        <div className="text-gray-600">{`${value.toLocaleString()} responses`}</div>
                        <div className="text-gray-500">{`Avg. ${avgTime.toFixed(1)} hours`}</div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2
                          w-2 h-2 bg-white transform rotate-45
                          border-r border-b border-gray-100"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
