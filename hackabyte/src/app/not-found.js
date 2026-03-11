'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);

  useNoFlash();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C]">
      <div className="animate-pulse text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0C] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      {/* Massive 404 watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[20rem] md:text-[30rem] font-black tracking-tight text-white/[0.02]">404</span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-24 px-4 text-center">
        <span className="label-uppercase mb-6 block">Page Not Found</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
          <span className="heading-gradient">404</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
