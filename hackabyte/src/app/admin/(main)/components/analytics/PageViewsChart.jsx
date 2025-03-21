'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

export default function PageViewsChart({ data, timeRange }) {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  const formatXAxis = (value) => {
    if (!value) return '';
    
    switch (timeRange) {
      case 'day':
        return `${value}h`;
      case 'week':
        return value.substring(0, 3); // First 3 chars of day name
      case 'month':
        return value; // Day of month
      case 'year':
        return value.substring(0, 3); // First 3 chars of month name
      default:
        return value;
    }
  };

  const getTimeLabel = () => {
    switch (timeRange) {
      case 'day': return 'Hours';
      case 'week': return 'Days';
      case 'month': return 'Days';
      case 'year': return 'Months';
      default: return 'Time';
    }
  };

  return (
    <div className="bg-[#16161A] rounded-xl p-6 border border-gray-800 shadow-lg h-full">
      <h3 className="text-xl font-semibold mb-6 text-white">Page Views</h3>
      <div className="h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D39" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF" 
                fontSize={12} 
                tickFormatter={formatXAxis}
                label={{ 
                  value: getTimeLabel(), 
                  position: 'insideBottomRight', 
                  offset: -10,
                  fill: '#9CA3AF'
                }}
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12}
                label={{ 
                  value: 'Views', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#9CA3AF'
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1E', 
                  borderColor: '#374151',
                  color: 'white'
                }}
                labelStyle={{ color: 'white' }}
              />
              <Legend wrapperStyle={{ color: 'white' }}/>
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#FF2247" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
                name="Views"
              />
              <Line 
                type="monotone" 
                dataKey="uniqueVisitors" 
                stroke="#3B82F6" 
                strokeWidth={2} 
                name="Unique Visitors"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No data available for this time range
          </div>
        )}
      </div>
    </div>
  );
}
