'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  [key: string]: any;
}

interface LineChartProps {
  data: DataPoint[];
  lines: {
    dataKey: string;
    stroke: string;
    name?: string;
  }[];
  xAxisKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisKey,
  title,
  subtitle,
  height = 400,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            vertical={false} 
          />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '0.75rem'
            }}
            labelStyle={{ color: '#111827', fontWeight: 500, marginBottom: '0.5rem' }}
            itemStyle={{ color: '#4b5563', fontSize: '0.875rem' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '1rem',
              fontSize: '0.875rem',
              color: '#4b5563'
            }}
          />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name || line.dataKey}
              strokeWidth={2}
              dot={{ 
                r: 4,
                strokeWidth: 2,
                fill: '#fff',
                stroke: line.stroke
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: '#fff',
                stroke: line.stroke
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
