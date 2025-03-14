/**
 * Upcoming Events Component
 * 
 * Displays featured upcoming events on the home page with:
 * - Section title and description
 * - Event cards with images, dates, locations, and descriptions
 * - Age group and competition level badges
 * - Animation effects that trigger when scrolled into view
 * - Call-to-action buttons to learn more about each event
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { upcomingEvents } from '@/lib/data/upcomingEvents';
import Container from '@/components/shared/Container';

export default function UpcomingEvents() {
  // Reference for triggering animations when section scrolls into view
  const ref = useRef(null);
  // useInView hook to detect when section enters viewport
  // once: true ensures animation only happens once
  // amount: 0.2 means animation triggers when 20% of the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Limit display to only the first two upcoming events
  const displayedEvents = upcomingEvents.slice(0, 2);

  // Animation variants for the event cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 md:py-20 bg-[#1A1A1E]" id="events" ref={ref}>
      <Container>
        {/* Section heading with animation that triggers when scrolled into view */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 px-4 sm:px-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Upcoming Events
          </h2>
          <div className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us at our next hackathon and be part of an exciting community of young innovators.
          </div>
        </motion.div>

        {/* Event cards grid - 1 column on mobile, 2 columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-0">
          {displayedEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
              className="bg-[#16161A] rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-[#F93236]/30 transition-all duration-300"
            >
              {/* Event image with overlay gradient and hover zoom effect */}
              <div className="relative h-48 overflow-hidden">
                {/* Using div with background image instead of img to avoid Next.js hydration issues */}
                <div 
                  className="absolute inset-0 transition-transform duration-500 hover:scale-110"
                  style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  aria-label={event.title}
                ></div>
                {/* Gradient overlay to improve text readability over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Event title and tags positioned at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Age group and competition level badges */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {event.ageGroups.map((group, idx) => (
                      <span 
                        key={idx} 
                        className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                          group === "High School" 
                            ? "bg-[#F93236]" 
                            : group === "Middle School" 
                            ? "bg-[#FF2247]" 
                            : "bg-[#333333]"
                        }`}
                      >
                        {group}
                      </span>
                    ))}
                    <span className="px-2 py-1 text-xs font-semibold rounded-full text-white bg-[#444444]">
                      {event.competitionLevel}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
              
              {/* Event details section */}
              <div className="p-4 sm:p-6">
                {/* Event date with calendar icon */}
                <div className="flex items-center text-gray-400 mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {event.date}
                </div>
                {/* Event location with map pin icon */}
                <div className="flex items-start text-gray-400 mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                {/* Event description */}
                <p className="text-gray-300 mb-5 sm:mb-6">{event.description}</p>
                
                {/* CTA button with hover animation */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto"
                >
                  <Link href="/events#registration" className="btn-primary w-full block text-center">
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
