'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { upcomingEvents } from '@/lib/data/upcomingEvents';

export default function UpcomingEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Using the first three events from the upcomingEvents data
  const displayedEvents = upcomingEvents.slice(0, 3);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-[#1A1A1E]" id="events" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Upcoming Events
          </h2>
          <div className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us at our next hackathon and be part of an exciting community of young innovators.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="bg-[#16161A] rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-[#F93236]/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                {/* Using div with background image instead of img to avoid hydration issues */}
                <div 
                  className="absolute inset-0 transition-transform duration-500 hover:scale-110"
                  style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  aria-label={event.title}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {event.ageGroups.map((group, idx) => (
                      <span 
                        key={idx} 
                        className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                          group === "High School" 
                            ? "bg-[#F93236]" 
                            : group === "Middle School" 
                            ? "bg-[#FF2247]" 
                            : "bg-[#1B247C]"
                        }`}
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {event.date}
                </div>
                <div className="flex items-start text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                <p className="text-gray-300 mb-6">{event.description}</p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto"
                >
                  <Link href={event.registrationLink} className="btn-primary w-full block text-center">
                    Register Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}