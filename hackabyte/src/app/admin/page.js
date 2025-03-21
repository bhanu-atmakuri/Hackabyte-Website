'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layouts/AdminLayout';
import { ensureAdminAuth } from '@/lib/auth/adminAuth';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import AdminErrorHandler from '@/components/admin/ErrorBoundary';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verify admin authentication
    const checkAuth = async () => {
      try {
        const isAdmin = await ensureAdminAuth();
        if (!isAdmin) {
          router.push('/auth');
          return;
        }
        
        // Fetch dashboard data here
        // For now, just set loading to false
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

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
          <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Events"
              value="8 active"
              description="Manage your events"
              linkText="View Events"
              linkHref="/admin/events"
            />
            
            <DashboardCard
              title="Users"
              value="1,250+"
              description="Manage registered users"
              linkText="View Users"
              linkHref="/admin/users"
            />
            
            <DashboardCard
              title="Analytics"
              value="View stats"
              description="Check website performance"
              linkText="View Analytics"
              linkHref="/admin/analytics"
            />
          </div>
        </div>
      </AdminLayout>
    </AdminErrorHandler>
  );
}

function DashboardCard({ title, value, description, linkText, linkHref }) {
  return (
    <div className="bg-[#16161A] rounded-xl p-6 border border-gray-800 shadow-lg">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="text-2xl font-bold mt-2 text-[#FF2247]">{value}</p>
      <p className="text-gray-400 mt-2">{description}</p>
      <div className="mt-4">
        <a 
          href={linkHref}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          {linkText} →
        </a>
      </div>
    </div>
  );
}
