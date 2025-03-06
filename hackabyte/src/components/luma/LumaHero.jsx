'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LumaHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1A1A1E]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <img 
                src="/api/placeholder/200/80" 
                alt="LUMA Logo" 
                className="h-16 mx-auto"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#FF2247] mb-6">
              LUMA
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Raising inclusivity for software education, making coding accessible to all young minds
              regardless of background or experience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="#classes" className="btn-primary">
                  Join Our Classes
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="#volunteer" className="btn-secondary">
                  Volunteer With Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}