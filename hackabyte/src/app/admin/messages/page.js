'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ContactManagement from '@/components/admin/ContactManagement';

export default function AdminMessagesPage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true on mount (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Show nothing during SSR to prevent hydration mismatch
  if (!isClient) {
    return null;
  }
  
  // Check if the user is logged in and is an admin
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#16161A] flex items-center justify-center">
        <div className="animate-pulse text-[#FF2247] text-2xl">Loading...</div>
      </div>
    );
  }
  
  if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
    redirect('/auth');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Contact Messages</h1>
      
      <ContactManagement />
    </div>
  );
}
