'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/shared/Container';
import { getAllEvents } from '@/lib/firebase/events';
import useEventEmitter from '@/lib/hooks/useEventEmitter';
import { EVENT_TYPES } from '@/lib/services/eventEmitterService';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';

function parseEventDate(value) {
  if (!value) return null;

  // Firestore Timestamp support
  if (typeof value === 'object' && typeof value.toDate === 'function') {
    return value.toDate();
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string') {
    // Avoid timezone shifting for date-only strings (YYYY-MM-DD)
    const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
      const year = Number(dateOnlyMatch[1]);
      const month = Number(dateOnlyMatch[2]);
      const day = Number(dateOnlyMatch[3]);
      return new Date(year, month - 1, day);
    }
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatEventDate(startValue, endValue) {
  const startDate = parseEventDate(startValue);
  const endDate = parseEventDate(endValue);

  if (!startDate) return 'TBD';

  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const startLabel = startDate.toLocaleDateString('en-US', dateOptions);

  if (!endDate || startDate.toDateString() === endDate.toDateString()) {
    return startLabel;
  }

  const endLabel = endDate.toLocaleDateString('en-US', dateOptions);
  return `${startLabel} - ${endLabel}`;
}

export default function PastEventsList() {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEventEmitter(EVENT_TYPES.EVENTS_LOADED, (loadedEvents) => {
    setPastEvents(loadedEvents.filter(event => event.hasPassed && event.showOnPastEventsPage));
    setLoading(false);
  });

  useEventEmitter(EVENT_TYPES.EVENT_ERROR, (err) => {
    console.error('Error loading events:', err);
    setError('Failed to load events. Please try again later.');
    setLoading(false);
  });

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

  const eventTypes = ['All', ...new Set(pastEvents.map(event => event.eventType).filter(Boolean))];

  const filteredEvents = filter === 'All'
    ? pastEvents
    : pastEvents.filter(event => event.eventType === filter);

  return (
    <section className="py-24 md:py-32 bg-[#0E0E11] relative" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-500">Loading past events...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-8 card-glass rounded-xl">
            {error}
          </div>
        ) : pastEvents.length === 0 ? (
          <div className="text-center text-gray-500 p-8 card-glass rounded-xl">
            No past events found.
          </div>
        ) : (
          <>
            {eventTypes.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                      filter === type
                        ? 'bg-gradient-to-r from-[#F93236] to-[#FF2247] text-white'
                        : 'bg-white/[0.03] border border-white/[0.08] text-gray-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map((event, index) => {
                const eventTitle = event.title || event.name || 'Untitled Event';
                const eventDate = formatEventDate(event.startDate || event.date, event.endDate);
                const eventImage = resolveImageSrc(event.image, PLACEHOLDER_IMAGES.event);

                return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.5) }}
                  className="card-glass rounded-xl overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110 sepia-[.15]"
                      style={{
                        backgroundImage: `url(${eventImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] to-transparent opacity-60"></div>
                    {event.eventType && (
                      <div className="absolute top-3 right-3 bg-white/[0.1] backdrop-blur-sm border border-white/[0.1] text-white text-xs px-3 py-1 font-bold uppercase tracking-wider">
                        {event.eventType}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold tracking-tight text-white mb-2 line-clamp-1">{eventTitle}</h3>

                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{eventDate}</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

                    <Link
                      href={`/events/${event.id}`}
                      className="inline-block text-[#FF2247] text-sm font-bold hover:text-[#ff4667] transition-colors"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
