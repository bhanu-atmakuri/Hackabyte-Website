'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsMounted(true);
    // You would typically check for admin authentication here
    // and redirect if not authenticated
  }, []);
  
  if (!isMounted) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/events" className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <p className="text-gray-400">Manage hackathons and events</p>
        </Link>
        
        <Link href="/admin/analytics" className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-gray-400">View registration and participation data</p>
        </Link>
      </div>
    </div>
  );
}
