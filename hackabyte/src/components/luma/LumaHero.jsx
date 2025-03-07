// src/components/luma/LumaHero.jsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LumaHero() {
  return (
    <section className="relative pt-10 pb-20 bg-[#1A1A1E]">
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
            <img 
              src="/logo-luma.png" 
              alt="LUMA Logo" 
              className="h-70 mx-auto mb-0"
            />
           
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              A subsidiary of Hackabyte dedicated to raising inclusivity for software education.
              Empowering every student to learn coding, irrespective of their skill level.
            </p>
           
            <div className="flex flex-wrap justify-center gap-4 mt-8">

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="#join" className="bg-[#BADA55] text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#A0C142] transition-all duration-300 transform hover:scale-105">
                  JOIN OUR CLASSES!
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="#" className="bg-[#1A1A1E] text-white border border-[#BADA55] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#BADA55]/10 transition-all duration-300 transform hover:scale-105">
                  Join Discord
                </Link>
              </motion.div>
            </div>
           
            <div className="flex justify-center space-x-4 mt-12">
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-[#BADA55] mb-2">All Ages</span>
                <span className="text-gray-300">Inclusive Learning</span>
              </div>
             
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-[#BADA55] mb-2">Any Level</span>
                <span className="text-gray-300">Beginner to Advanced</span>
              </div>
             
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-[#BADA55] mb-2">Community</span>
                <span className="text-gray-300">Supportive Environment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}