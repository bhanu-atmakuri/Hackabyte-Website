'use client';

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EventManagement from '@/components/admin/EventManagement';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function AdminEventsPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // The layout handles initial loading state
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <EventManagement />
    </>
  );
}
