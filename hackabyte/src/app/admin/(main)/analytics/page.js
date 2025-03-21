'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useNoFlash from '@/lib/hooks/useNoFlash';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    userCount: 0,
    eventCount: 0,
    registrationsCount: 0,
  });

  // Prevent flash of unstyled content during hydration
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Here you would fetch your actual analytics data
    // This is just placeholder data
    setAnalyticsData({
      userCount: 1250,
      eventCount: 15,
      registrationsCount: 780,
    });
  }, []);

  // Chart data
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'User Registrations',
        data: [65, 90, 125, 81, 110, 75],
        backgroundColor: 'rgba(255, 34, 71, 0.7)',
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Growth',
      },
    },
  };

  // Show loading state before hydration is complete
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Analytics Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Total Users</h2>
          <p className="text-4xl font-bold text-[#FF2247]">{analyticsData.userCount}</p>
        </div>
        
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Active Events</h2>
          <p className="text-4xl font-bold text-[#FF2247]">{analyticsData.eventCount}</p>
        </div>
        
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Event Registrations</h2>
          <p className="text-4xl font-bold text-[#FF2247]">{analyticsData.registrationsCount}</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="bg-[#16161A] rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">User Growth</h2>
        <div className="h-80">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
      
      {/* Additional Analytics Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Top Events</h2>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">Hackathon 2023</span>
              <span className="text-[#FF2247] font-medium">245 registrations</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">Workshop: Web Dev</span>
              <span className="text-[#FF2247] font-medium">186 registrations</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">AI Conference</span>
              <span className="text-[#FF2247] font-medium">132 registrations</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#16161A] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Recent Activity</h2>
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-3 border-b border-gray-800 pb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-300">New user registered</span>
              <span className="text-gray-500 text-sm ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3 border-b border-gray-800 pb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-300">Event registration</span>
              <span className="text-gray-500 text-sm ml-auto">15 min ago</span>
            </div>
            <div className="flex items-center space-x-3 border-b border-gray-800 pb-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-300">New event created</span>
              <span className="text-gray-500 text-sm ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
