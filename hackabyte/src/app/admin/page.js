'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This component redirects from /admin to /admin/profile
export default function AdminRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the profile page which is now the default admin page
    router.replace('/admin/profile');
  }, [router]);
  
  // Return null while redirecting
  return null;
}
