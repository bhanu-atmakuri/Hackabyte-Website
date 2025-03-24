'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/shared/Container';
import { getAllEvents } from '@/lib/firebase/events';
import useEventEmitter from '@/lib/hooks/useEventEmitter';
import { EVENT_TYPES } from '@/lib/services/eventEmitterService';

export default function PastEventsList() {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Listen for events data changes
  useEventEmitter(EVENT_TYPES.EVENTS_LOADED, (loadedEvents) => {
    setPastEvents(loadedEvents.filter(event => event.hasPassed));
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
  const eventTypes = ['All', ...new Set(pastEvents.map(event => event.eventType).filter(Boolean))];

  // Filter events based on selected type
  const filteredEvents = filter === 'All' 
    ? pastEvents 
    : pastEvents.filter(event => event.eventType === filter);

  return (
    <section className="py-16 bg-[#16161A]" ref={ref}>
      <Container>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white">Loading past events...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-8 bg-[#1A1A1E] rounded-xl">
            {error}
          </div>
        ) : pastEvents.length === 0 ? (
          <div className="text-center text-gray-400 p-8 bg-[#1A1A1E] rounded-xl">
            No past events found.
          </div>
        ) : (
          <>
            {/* Filter controls - Updated styling */}
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

            {/* Past events grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.5) }}
                  className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
                >
                  {/* Event Image */}
                  <div className="relative h-48">
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(${event.image || "/api/placeholder/600/400"})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    {event.eventType && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {event.eventType}
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
                    
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                    
                    <Link 
                      href={`/events/${event.id}`} 
                      className="inline-block text-[#FF2247] text-sm font-medium hover:text-[#ff4667] transition-colors"
                    >
                      View Details →
                    </Link>
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
