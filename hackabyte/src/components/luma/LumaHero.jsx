'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LumaHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1A1A1E]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#BADA55] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#BADA55] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#BADA55] mb-6">
              LUMA
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Dedicated to raising inclusivity for software education
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="#join" className="bg-[#BADA55] hover:bg-[#A5C244] text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-xl py-4 px-8">
                JOIN OUR CLASSES!
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}