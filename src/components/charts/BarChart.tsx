'use client';

import React, { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
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

interface BarConfig {
  dataKey: string;
  fill: string;
  name?: string;
  radius?: number | [number, number, number, number];
  maxBarSize?: number;
}

interface BarChartProps {
  data: DataPoint[];
  xAxisKey: string;
  bars: BarConfig[];
  title?: string;
  subtitle?: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey,
  bars,
  title,
  subtitle,
  height = 400,
}) => {
  // Memoize chart configuration to prevent unnecessary recalculations
  const chartConfig = useMemo(() => ({
    margin: { top: 20, right: 30, left: 20, bottom: 60 },
    bars: bars.map(bar => ({
      ...bar,
      radius: [4, 4, 0, 0] as [number, number, number, number], // Rounded top corners
      maxBarSize: 50,
    }))
  }), [bars]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={chartConfig.margin}
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
            cursor={{ fill: 'rgba(243, 244, 246, 0.4)' }}
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
          {chartConfig.bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              {...bar}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
