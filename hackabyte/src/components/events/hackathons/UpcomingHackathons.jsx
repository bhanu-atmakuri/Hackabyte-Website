'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { upcomingEvents } from '@/lib/data/upcomingEvents';

export default function UpcomingHackathons() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Filter events of type Hackathon that are coming up
  const upcomingHackathons = upcomingEvents.filter(event => 
    event.eventType === 'Hackathon' && 
    new Date(event.date.split(',')[0]) > new Date()
  ).slice(0, 2); // Get the next 2 hackathons

  return (
    <section className="py-20 bg-[#16161A]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Upcoming Hackathons
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Register now for our next hackathons and start your journey of innovation and collaboration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Hackathon Image */}
                <div className="md:col-span-2 relative h-48 md:h-full min-h-[200px]">
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${hackathon.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1E]/80 to-transparent md:bg-gradient-to-l"></div>
                </div>

                {/* Hackathon Details */}
                <div className="md:col-span-3 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{hackathon.title}</h3>
                  
                  <div className="flex items-center text-gray-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{hackathon.date}</span>
                  </div>
                  
                  <div className="flex items-start text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div>{hackathon.location}</div>
                      <div className="text-sm text-gray-500">{hackathon.state}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{hackathon.description}</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={hackathon.registrationLink} className="btn-primary inline-block">
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}