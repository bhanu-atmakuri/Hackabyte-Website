'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page redirects to the events management page
export default function AdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/admin/events');
  }, [router]);
  
  return null;
}
