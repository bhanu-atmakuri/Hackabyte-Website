'use client';

import { motion } from 'framer-motion';
import Container from '../shared/Container';

export default function EventsHero() {
  return (
    <section className="relative pt-10 xs:pt-12 sm:pt-16 pb-12 xs:pb-16 sm:pb-20 bg-[#1A1A1E]">
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
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF2247] mb-3 xs:mb-4 sm:mb-6">
              Hackabyte Events
            </h1>
            
            <p className="text-base xs:text-lg sm:text-xl text-white mb-6 xs:mb-8 max-w-3xl mx-auto">
              Discover our schedule of hackathons, workshops, and tech challenges 
              designed to inspire and empower the next generation of innovators.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4 mt-6 xs:mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full xs:w-auto"
              >
                <a href="#upcoming" className="btn-primary block w-full xs:w-auto">
                  Upcoming Events
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full xs:w-auto"
              >
                <a href="/events/past-events" className="btn-secondary block w-full xs:w-auto">
                  Past Events
                </a>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 xs:gap-4 mt-8 xs:mt-10 sm:mt-12">
              <div className="flex flex-col items-center p-2 xs:p-3 sm:p-4">
                <span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[#FF2247] mb-1 xs:mb-2">15+</span>
                <span className="text-sm xs:text-base text-gray-300">Events Per Year</span>
              </div>
              
              <div className="flex flex-col items-center p-2 xs:p-3 sm:p-4">
                <span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[#FF2247] mb-1 xs:mb-2">12</span>
                <span className="text-sm xs:text-base text-gray-300">Cities</span>
              </div>
              
              <div className="flex flex-col items-center p-2 xs:p-3 sm:p-4">
                <span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[#FF2247] mb-1 xs:mb-2">3</span>
                <span className="text-sm xs:text-base text-gray-300">Age Groups</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
