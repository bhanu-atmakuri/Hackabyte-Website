'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function UserAnalytics({ data }) {
  const [activeTab, setActiveTab] = useState('demographics');
  
  if (!data) return null;
  
  const { demographics, sources, devices } = data;
  
  const COLORS = ['#FF2247', '#3B82F6', '#10B981', '#A855F7', '#F97316', '#F59E0B'];
  
  const renderContent = () => {
    let chartData;
    let title;
    
    switch (activeTab) {
      case 'demographics':
        chartData = demographics;
        title = 'User Demographics';
        break;
      case 'sources':
        chartData = sources;
        title = 'Traffic Sources';
        break;
      case 'devices':
        chartData = devices;
        title = 'Device Types';
        break;
    }
    
    return (
      <div className="h-full">
        <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1A1A1E', 
                  borderColor: '#374151',
                  color: 'white' 
                }}
                formatter={(value, name) => [`${value} (${((value / chartData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%)`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-[#16161A] rounded-xl p-6 border border-gray-800 shadow-lg h-full">
      <div className="flex border-b border-white/[0.06] mb-6">
        <button
          className={`pb-3 mr-6 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'demographics' ? 'text-[#FF2247] border-b-2 border-[#FF2247]' : 'text-gray-500 hover:text-white'}`}
          onClick={() => setActiveTab('demographics')}
        >
          Demographics
        </button>
        <button
          className={`pb-3 mr-6 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'sources' ? 'text-[#FF2247] border-b-2 border-[#FF2247]' : 'text-gray-500 hover:text-white'}`}
          onClick={() => setActiveTab('sources')}
        >
          Sources
        </button>
        <button
          className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'devices' ? 'text-[#FF2247] border-b-2 border-[#FF2247]' : 'text-gray-500 hover:text-white'}`}
          onClick={() => setActiveTab('devices')}
        >
          Devices
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
}
