'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ArrowSmallUpIcon, ArrowSmallDownIcon } from '@heroicons/react/24/solid';

export default function EventAnalytics({ data }) {
  const [eventsData, setEventsData] = useState([]);
  const [activeView, setActiveView] = useState('registrations');
  
  useEffect(() => {
    if (data?.events) {
      setEventsData(data.events);
    }
  }, [data]);
  
  if (!data || !data.events || data.events.length === 0) {
    return (
      <div className="bg-[#16161A] rounded-xl p-6 border border-gray-800 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Event Analytics</h3>
        <p className="text-gray-400">No event data available</p>
      </div>
    );
  }
  
  const renderEventStatCards = () => {
    const eventStats = [
      {
        title: 'Most Popular Event',
        value: data.mostPopularEvent?.name || 'N/A',
        subtext: data.mostPopularEvent ? `${data.mostPopularEvent.registrations} registrations` : '',
        color: 'border-blue-500',
        trending: data.mostPopularEvent?.trend
      },
      {
        title: 'Highest Completion Rate',
        value: data.highestCompletionRate?.name || 'N/A',
        subtext: data.highestCompletionRate ? `${data.highestCompletionRate.rate}% completion` : '',
        color: 'border-green-500',
        trending: data.highestCompletionRate?.trend
      },
      {
        title: 'Upcoming Events',
        value: data.upcomingEvents || 0,
        subtext: 'In the next 30 days',
        color: 'border-purple-500',
      },
      {
        title: 'Average Registrations',
        value: data.avgRegistrations || 0,
        subtext: 'Per event',
        color: 'border-orange-500',
        trending: data.avgRegistrationTrend
      }
    ];
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {eventStats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-[#1A1A1E] rounded-lg p-4 border-l-4 ${stat.color}`}
          >
            <h4 className="text-gray-400 text-sm font-medium">{stat.title}</h4>
            <div className="flex items-end mt-1">
              <div className="text-xl font-bold text-white">{stat.value}</div>
              {stat.trending && (
                <div className={`flex items-center ml-2 ${stat.trending > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trending > 0 ? (
                    <ArrowSmallUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowSmallDownIcon className="w-4 h-4" />
                  )}
                  <span className="text-xs ml-0.5">{Math.abs(stat.trending)}%</span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1">{stat.subtext}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#16161A] rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-4 sm:mb-0">Event Analytics</h3>
        <div className="flex space-x-2 bg-white/[0.03] border border-white/[0.06] p-1">
          <button
            className={`px-4 py-1.5 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeView === 'registrations'
                ? 'bg-[#FF2247] text-white'
                : 'text-gray-500 hover:text-white'
            }`}
            onClick={() => setActiveView('registrations')}
          >
            Registrations
          </button>
          <button
            className={`px-4 py-1.5 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeView === 'attendance'
                ? 'bg-[#FF2247] text-white'
                : 'text-gray-500 hover:text-white'
            }`}
            onClick={() => setActiveView('attendance')}
          >
            Attendance
          </button>
        </div>
      </div>
      
      {renderEventStatCards()}
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={eventsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D39" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              angle={-45} 
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1A1E', 
                borderColor: '#374151',
                color: 'white' 
              }}
            />
            <Legend />
            {activeView === 'registrations' ? (
              <>
                <Bar dataKey="registrations" name="Registrations" fill="#FF2247" />
                <Bar dataKey="capacity" name="Capacity" fill="#3B82F6" />
              </>
            ) : (
              <>
                <Bar dataKey="attendance" name="Attendance" fill="#10B981" />
                <Bar dataKey="registrations" name="Registrations" fill="#FF2247" />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
