'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/shared/Container';
import { getAllEvents } from '@/lib/firebase/events';
import useEventEmitter from '@/lib/hooks/useEventEmitter';
import { EVENT_TYPES } from '@/lib/services/eventEmitterService';

export default function UpcomingEventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All'); // Add filter state
  
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Listen for events data changes
  useEventEmitter(EVENT_TYPES.EVENTS_LOADED, (loadedEvents) => {
    setEvents(loadedEvents.filter(event => !event.hasPassed));
    setLoading(false);
  });

  // Listen for errors
  useEventEmitter(EVENT_TYPES.EVENT_ERROR, (err) => {
    console.error('Error loading events:', err);
    setError('Failed to load events. Please try again later.');
    setLoading(false);
  });

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await getAllEvents();
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get unique event types for filtering
  const eventTypes = ['All', ...new Set(events.map(event => event.eventType).filter(Boolean))];

  // Filter events based on selected type
  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(event => event.eventType === filter);

  return (
    <section className="py-20 bg-[#16161A]" ref={ref} id="upcoming-events">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Upcoming Events
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Register now for our next events and start your journey of innovation and collaboration.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white">Loading events...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-8 bg-[#1A1A1E] rounded-xl">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-400 p-8 bg-[#1A1A1E] rounded-xl">
            No upcoming events found. Check back soon!
          </div>
        ) : (
          <>
            {/* Filter controls - only show if there are multiple event types */}
            {eventTypes.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filter === type
                        ? 'bg-[#FF2247] text-white'
                        : 'bg-[#1A1A1E] text-gray-400 hover:bg-[#252529]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Event Image */}
                    <div className="md:col-span-2 relative h-48 md:h-full min-h-[200px]">
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backgroundImage: `url(${event.image || "/api/placeholder/600/400"})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1E]/80 to-transparent md:bg-gradient-to-l"></div>
                      
                      {/* Event Type Badge */}
                      {event.eventType && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {event.eventType}
                        </div>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="md:col-span-3 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    
                    <div className="flex items-center text-gray-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-start text-gray-400 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div>{event.location}</div>
                        {event.city && <div className="text-sm text-gray-500">{event.city}</div>}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={event.registrationLink || "/events#registration"} className="btn-primary inline-block">
                          Sign Up
                        </Link>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={`/events/${event.id}`} className="btn-secondary inline-block">
                          Learn More
                        </Link>
                      </motion.div>
                    </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
