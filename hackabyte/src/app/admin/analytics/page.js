'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layouts/AdminLayout';
import AnalyticsSummary from '@/components/admin/analytics/AnalyticsSummary';
import EventAnalytics from '@/components/admin/analytics/EventAnalytics';
import UserAnalytics from '@/components/admin/analytics/UserAnalytics';
import PageViewsChart from '@/components/admin/analytics/PageViewsChart';
import { ensureAdminAuth } from '@/lib/auth/adminAuth';
import { fetchAnalyticsData } from '@/lib/firebase/analytics';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import AdminErrorHandler from '@/components/admin/ErrorBoundary';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month', 'year'
  const router = useRouter();

  useEffect(() => {
    // Verify admin authentication
    const checkAuth = async () => {
      const isAdmin = await ensureAdminAuth();
      if (!isAdmin) {
        router.push('/auth');
        return;
      }
      
      loadAnalyticsData();
    };
    
    checkAuth();
  }, [router]);
  
  // Fetch analytics data when time range changes
  useEffect(() => {
    if (!isLoading) {
      loadAnalyticsData();
    }
  }, [timeRange]);
  
  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAnalyticsData(timeRange);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="large" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminErrorHandler>
      <AdminLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <div className="flex space-x-2">
              <TimeRangeSelector 
                currentRange={timeRange} 
                onChange={handleTimeRangeChange} 
              />
            </div>
          </div>
          
          <AnalyticsSummary data={analyticsData?.summary} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <PageViewsChart data={analyticsData?.pageViews} timeRange={timeRange} />
            <UserAnalytics data={analyticsData?.users} />
          </div>
          
          <div className="mt-8">
            <EventAnalytics data={analyticsData?.events} />
          </div>
        </div>
      </AdminLayout>
    </AdminErrorHandler>
  );
}

function TimeRangeSelector({ currentRange, onChange }) {
  const ranges = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];
  
  return (
    <div className="flex bg-[#16161A] rounded-lg p-1 border border-gray-800">
      {ranges.map((range) => (
        <button
          key={range.id}
          onClick={() => onChange(range.id)}
          className={`px-4 py-2 text-sm rounded-md transition ${
            currentRange === range.id
              ? 'bg-[#FF2247] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
