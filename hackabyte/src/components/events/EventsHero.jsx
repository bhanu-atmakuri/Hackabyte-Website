/**
 * Events Hero Component
 * 
 * Displays the hero section for the Events page featuring:
 * - Animated title and description
 * - Navigation buttons to other events pages
 * - Stats about Hackabyte events
 * - Decorative background elements
 */

'use client';

import { motion } from 'framer-motion';
import Container from '../shared/Container';

export default function EventsHero() {
  return (
    <section className="relative pt-16 md:pt-8 pb-20 bg-[#1A1A1E] flex items-center">
      {/* Decorative background elements with gradient blurs */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>
      
      <Container>
        <div className="text-center">
          {/* Main content with fade-in and slide-up animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#FF2247] mb-6">
              Hackabyte Events
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Discover our schedule of hackathons, workshops, and tech challenges 
              designed to inspire and empower the next generation of innovators.
            </p>
            
            {/* CTA buttons for navigating to related pages */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <a href="#upcoming" className="btn-primary block w-full text-center">
                  Upcoming Events
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <a href="/events/past-events" className="btn-secondary block w-full text-center">
                  Past Events
                </a>
              </motion.div>
            </div>
            
            {/* Event statistics with highlighted numbers */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-0 md:space-x-4 mt-12">
              <div className="flex flex-col items-center p-2 md:p-4 w-full sm:w-auto">
                <span className="text-3xl md:text-4xl font-bold text-[#FF2247] mb-2">15+</span>
                <span className="text-gray-300">Events Per Year</span>
              </div>
              
              <div className="flex flex-col items-center p-2 md:p-4 w-full sm:w-auto">
                <span className="text-3xl md:text-4xl font-bold text-[#FF2247] mb-2">12</span>
                <span className="text-gray-300">Cities</span>
              </div>
              
              <div className="flex flex-col items-center p-2 md:p-4 w-full sm:w-auto">
                <span className="text-3xl md:text-4xl font-bold text-[#FF2247] mb-2">3</span>
                <span className="text-gray-300">Age Groups</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
