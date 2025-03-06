'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import useNoFlash from '@/lib/hooks/useNoFlash';

/**
 * Base page layout component with consistent spacing and hydration handling
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.className - Additional CSS classes for the main content area
 * @returns {JSX.Element}
 */
export default function BasePageLayout({ children, className = '' }) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []); // Empty dependency array to ensure it only runs once
  
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className={`min-h-screen page-top-spacing ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}