'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>;
  }

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="bg-[#FF5C00] hover:bg-[#D94C00] text-white font-bold py-2 px-6 rounded-full transition duration-300">
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
