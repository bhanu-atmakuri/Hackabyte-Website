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

export default function UpcomingEventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEventEmitter(EVENT_TYPES.EVENTS_LOADED, (loadedEvents) => {
    setEvents(loadedEvents.filter(event => !event.hasPassed));
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

  const eventTypes = ['All', ...new Set(events.map(event => event.eventType).filter(Boolean))];

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(event => event.eventType === filter);

  return (
    <section className="py-24 md:py-32 bg-[#0E0E11] relative" ref={ref} id="upcoming-events">
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">What's Next</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Upcoming <span className="heading-gradient">Events</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Register now for our next events and start your journey of innovation and collaboration.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-500">Loading events...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-8 card-glass rounded-xl">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 p-8 card-glass rounded-xl">
            No upcoming events found. Check back soon!
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event, index) => {
                const eventTitle = event.title || event.name || 'Untitled Event';
                const eventDate = formatEventDate(event.startDate || event.date, event.endDate);
                const eventImage = resolveImageSrc(event.image, PLACEHOLDER_IMAGES.event);

                return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="card-glass rounded-xl overflow-hidden group"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 relative h-48 md:h-full min-h-[200px] overflow-hidden">
                      <div
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${eventImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E11]/80 to-transparent md:bg-gradient-to-l"></div>

                      {event.eventType && (
                        <div className="absolute top-3 right-3 bg-white/[0.1] backdrop-blur-sm border border-white/[0.1] text-white text-xs px-3 py-1 font-bold uppercase tracking-wider">
                          {event.eventType}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-3 p-6">
                      <h3 className="text-xl font-black tracking-tight text-white mb-2">{eventTitle}</h3>

                    <div className="flex items-center text-gray-400 mb-3 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{eventDate}</span>
                    </div>

                    <div className="flex items-start text-gray-400 mb-4 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div>{event.location}</div>
                        {event.city && <div className="text-gray-600">{event.city}</div>}
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{event.description}</p>

                    <div className="flex flex-wrap gap-3">
                      <Link href={event.registrationLink || "/events#registration"} className="btn-primary inline-block text-sm">
                        Sign Up
                      </Link>
                      <Link href={`/events/${event.id}`} className="btn-secondary inline-block text-sm">
                        Learn More
                      </Link>
                    </div>
                    </div>
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
