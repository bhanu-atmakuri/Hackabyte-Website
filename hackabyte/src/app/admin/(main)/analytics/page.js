'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import useNoFlash from '@/lib/hooks/useNoFlash';
import { fetchAnalyticsData } from '@/lib/firebase/analytics';
import { trackPageView } from '@/lib/firebase/analyticsService';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [analyticsData, setAnalyticsData] = useState({
    summary: {
      totalUsers: 0,
      activeEvents: 0,
      registrations: 0,
      pageViews: 0,
      userGrowth: 0,
      eventGrowth: 0,
      registrationGrowth: 0,
      pageViewGrowth: 0
    },
    pageViews: [],
    users: {
      demographics: [],
      sources: [],
      devices: []
    },
    events: {
      events: [],
      mostPopularEvent: null,
      highestCompletionRate: null
    }
  });

  // Prevent flash of unstyled content during hydration
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      trackPageView('Admin Analytics Dashboard');
    }
  }, []);

  // Fetch real analytics data
  useEffect(() => {
    if (!isMounted) return;
    
    const getAnalyticsData = async () => {
      setLoading(true);
      try {
        const data = await fetchAnalyticsData(timeRange);
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    getAnalyticsData();
  }, [isMounted, timeRange]);

  // Format chart data from real analytics data
  const pageViewsChartData = {
    labels: analyticsData.pageViews.map(item => item.name),
    datasets: [
      {
        label: 'Page Views',
        data: analyticsData.pageViews.map(item => item.views),
        backgroundColor: 'rgba(255, 34, 71, 0.7)',
        borderColor: 'rgba(255, 34, 71, 1)',
        borderWidth: 1
      },
      {
        label: 'Unique Visitors',
        data: analyticsData.pageViews.map(item => item.uniqueVisitors),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1
      }
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e5e5'
        }
      },
      title: {
        display: true,
        text: 'Website Traffic',
        color: '#e5e5e5'
      },
    },
    scales: {
      y: {
        ticks: { color: '#e5e5e5' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: '#e5e5e5' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  // Show loading state before hydration is complete
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        
        <div className="flex space-x-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#16161A] text-white border border-gray-700 rounded px-3 py-2"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Total Users</h2>
          <p className="text-4xl font-bold text-[#FF2247]">{analyticsData.summary.totalUsers.toLocaleString()}</p>
          <div className={`mt-2 text-sm ${analyticsData.summary.userGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {analyticsData.summary.userGrowth >= 0 ? '↑' : '↓'} {Math.abs(analyticsData.summary.userGrowth)}%
          </div>
        </div>
        
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Page Views</h2>
          <p className="text-4xl font-bold text-[#FF2247]">{analyticsData.summary.pageViews.toLocaleString()}</p>
          <div className={`mt-2 text-sm ${analyticsData.summary.pageViewGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {analyticsData.summary.pageViewGrowth >= 0 ? '↑' : '↓'} {Math.abs(analyticsData.summary.pageViewGrowth)}%
          </div>
        </div>
        
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Active Events</h2>
          <p className="text-4xl font-bold text-[#FF2247]">{analyticsData.summary.activeEvents}</p>
          <div className={`mt-2 text-sm ${analyticsData.summary.eventGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {analyticsData.summary.eventGrowth >= 0 ? '↑' : '↓'} {Math.abs(analyticsData.summary.eventGrowth)}%
          </div>
        </div>
        
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Event Registrations</h2>
          <p className="text-4xl font-bold text-[#FF2247]">{analyticsData.summary.registrations.toLocaleString()}</p>
          <div className={`mt-2 text-sm ${analyticsData.summary.registrationGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {analyticsData.summary.registrationGrowth >= 0 ? '↑' : '↓'} {Math.abs(analyticsData.summary.registrationGrowth)}%
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="bg-[#16161A] rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Traffic Overview</h2>
        <div className="h-80">
          <Bar options={chartOptions} data={pageViewsChartData} />
        </div>
      </div>
      
      {/* Additional Analytics Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Popular Events</h2>
          <div className="space-y-4 mt-4">
            {analyticsData.events.events.slice(0, 5).map((event, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-gray-300">{event.name}</span>
                <span className="text-[#FF2247] font-medium">{event.registrations} registrations</span>
              </div>
            ))}
          </div>
          
          {analyticsData.events.mostPopularEvent && (
            <div className="mt-6 p-4 bg-[#1E1E24] rounded-lg">
              <h3 className="font-semibold text-gray-300">Most Popular Event</h3>
              <p className="text-xl mt-1 text-[#FF2247]">{analyticsData.events.mostPopularEvent.name}</p>
              <p className="text-sm text-gray-400 mt-1">
                {analyticsData.events.mostPopularEvent.registrations} registrations
                {analyticsData.events.mostPopularEvent.trend > 0 && 
                  <span className="text-green-500 ml-2">↑ {analyticsData.events.mostPopularEvent.trend}%</span>
                }
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">User Demographics</h2>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">User Types</h3>
              {analyticsData.users.demographics.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">{item.name}</span>
                  <span className="text-[#FF2247]">{item.value}</span>
                </div>
              ))}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Devices</h3>
              {analyticsData.users.devices.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">{item.name}</span>
                  <span className="text-[#FF2247]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Traffic Sources</h3>
            <div className="grid grid-cols-2 gap-4">
              {analyticsData.users.sources.slice(0, 4).map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 text-sm">{item.name}</span>
                  <span className="text-[#FF2247]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
