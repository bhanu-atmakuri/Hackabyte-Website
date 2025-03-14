'use client';

import { motion } from 'framer-motion';
import Container from '../shared/Container';

export default function AboutHero() {
  return (
    <section className="relative pt-16 md:pt-32 pb-20 bg-[#1A1A1E] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>
      
      <Container>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#FF2247] mb-6">
              About Hackabyte
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Empowering the next generation of innovators through immersive coding experiences, 
              community building, and real-world problem solving.
            </p>
            
            <div className="flex justify-center space-x-4 mt-8">
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-[#FF2247] mb-2">5,000+</span>
                <span className="text-gray-300">Students Impacted</span>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-[#FF2247] mb-2">75+</span>
                <span className="text-gray-300">Events Hosted</span>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl font-bold text-[#FF2247] mb-2">30+</span>
                <span className="text-gray-300">Partner Schools</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
