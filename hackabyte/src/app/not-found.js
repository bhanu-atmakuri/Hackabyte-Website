'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
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
    return (
      <div className="min-h-screen bg-[#1A1A1E] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">
          <svg className="animate-spin h-10 w-10 text-[#FF2247]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1A1A1E] flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Large 404 number with gradient effect */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#FF2247] to-[#FF4D69]">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 blur-lg bg-gradient-to-r from-[#FF2247] to-[#FF4D69] -z-10 rounded-full"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Page Not Found
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The page you are looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="btn-primary inline-block py-3 px-8 text-lg font-semibold whitespace-nowrap"
              >
                Return Home
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/events" 
                className="btn-secondary inline-block py-3 px-8 text-lg font-semibold whitespace-nowrap"
              >
                Explore Events
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 -left-20 w-40 h-40 bg-[#FF2247]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-[#FF2247]/5 rounded-full blur-3xl -z-10"></div>
      </div>
      
      <Footer />
    </main>
  );
}
