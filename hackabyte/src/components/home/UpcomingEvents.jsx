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

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

// Fallback data in case API fails
const FALLBACK_EVENTS = [
  {
    _id: 'fallback-1',
    name: 'Spring Hackathon 2025 - WA',
    startDate: '2025-03-29T00:00:00.000Z',
    endDate: '2025-03-30T00:00:00.000Z',
    location: 'DigiPen Institute of Technology, Redmond',
    description: 'Join us for an exciting weekend of coding, learning, and networking at our Spring Hackathon in Redmond, WA.',
    image: '/api/placeholder/800/400',
    ageGroups: ['High School', 'Middle School'],
    competitionLevel: 'Beginner-Friendly'
  },
  {
    _id: 'fallback-2',
    name: 'Summer Code Camp - CA',
    startDate: '2025-07-15T00:00:00.000Z',
    endDate: '2025-07-20T00:00:00.000Z',
    location: 'UC Berkeley Campus, Berkeley',
    description: 'A week-long immersive coding experience for students of all skill levels, featuring workshops and hands-on projects.',
    image: '/api/placeholder/800/400',
    ageGroups: ['High School'],
    competitionLevel: 'Intermediate'
  }
];

export default function UpcomingEvents() {
  // State for events data
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Reference for triggering animations when section scrolls into view
  const ref = useRef(null);
  // useInView hook to detect when section enters viewport
  // once: true ensures animation only happens once
  // amount: 0.2 means animation triggers when 20% of the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Fetch events from API with fallback handling
  useEffect(() => {
    let isMounted = true;
    
    async function fetchEvents() {
      try {
        setIsLoading(true);
        
        // Get the base URL dynamically
        const baseUrl = typeof window !== 'undefined' 
          ? `${window.location.protocol}//${window.location.host}`
          : '';
          
        // Try using the absolute URL with dynamic origin
        const apiUrl = `${baseUrl}/api/events?status=upcoming`;
        
        console.log('Fetching from URL:', apiUrl);
        
        // Use a Promise race to enforce a timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        );
        
        const fetchPromise = fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });
        
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          if (data.success && data.events && data.events.length > 0) {
            console.log('API data received:', data.events.length, 'events');
            setEvents(data.events);
          } else {
            console.log('No events from API, using fallback');
            setEvents(FALLBACK_EVENTS);
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        if (isMounted) {
          console.log('Error occurred, using fallback data');
          setEvents(FALLBACK_EVENTS);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    fetchEvents();
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper function to format date range
  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
    } else {
      return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
    }
  };

  // Limit display to only the first two upcoming events
  const displayedEvents = events.slice(0, 2);

  // Animation variants for the event cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-[#1A1A1E]" id="events" ref={ref}>
        <Container>
          <div className="text-center mb-10 md:mb-16 px-4 sm:px-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
              Upcoming Events
            </h2>
            <div className="animate-pulse bg-gray-700 h-6 w-96 mx-auto rounded mb-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-0">
            {[1, 2].map(i => (
              <div key={i} className="bg-[#16161A] rounded-xl shadow-lg overflow-hidden border border-gray-800 animate-pulse">
                <div className="h-48 bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-24 bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-10 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

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
                    backgroundImage: `url(${event.image || '/api/placeholder/800/400'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  aria-label={event.title || event.name}
                ></div>
                {/* Gradient overlay to improve text readability over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Event title and tags positioned at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Age group and competition level badges */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {event.ageGroups && event.ageGroups.map((group, idx) => (
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
                  {event.competitionLevel && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full text-white bg-[#444444]">
                      {event.competitionLevel}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{event.name}</h3>
                </div>
              </div>
              
              {/* Event details section */}
              <div className="p-4 sm:p-6">
                {/* Event date with calendar icon */}
                <div className="flex items-center text-gray-400 mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {formatDateRange(event.startDate, event.endDate)}
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
                  <Link 
                    href={event._id ? `/events/${event._id}/register` : '/events'} 
                    className="btn-primary w-full block text-center"
                  >
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
