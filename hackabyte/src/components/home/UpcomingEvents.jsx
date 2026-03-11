'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';
import { getAllEvents } from '@/lib/firebase/events';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';

function parseEventDate(value) {
  if (!value) return null;
  if (typeof value === 'object' && typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === 'string') {
    const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
      return new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]));
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
  if (!endDate || startDate.toDateString() === endDate.toDateString()) return startLabel;
  const endLabel = endDate.toLocaleDateString('en-US', dateOptions);
  return `${startLabel} - ${endLabel}`;
}

function toAgeGroupList(ageGroups) {
  if (!ageGroups) return [];
  if (Array.isArray(ageGroups)) return ageGroups;
  if (typeof ageGroups === 'object') {
    return Object.entries(ageGroups)
      .filter(([, isSelected]) => Boolean(isSelected))
      .map(([group]) =>
        group.split(' ').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
      );
  }
  return [];
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const allEvents = await getAllEvents();
        const displayedEvents = allEvents
          .filter((event) => !event.hasPassed)
          .sort((a, b) => {
            const aDate = parseEventDate(a.startDate || a.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
            const bDate = parseEventDate(b.startDate || b.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
            return aDate - bDate;
          })
          .slice(0, 2);
        setEvents(displayedEvents);
      } catch (fetchError) {
        console.error('Error loading home upcoming events:', fetchError);
        setError('Failed to load upcoming events.');
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingEvents();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 md:py-32 bg-[#0E0E11] relative" id="events" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4 sm:px-0"
        >
          <span className="label-uppercase mb-4 block">Events</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Upcoming <span className="heading-gradient">Events</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Join us at our next hackathon and be part of an exciting community of young innovators.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-600 px-4 sm:px-0">Loading events...</div>
        ) : error ? (
          <div className="text-center text-red-400 px-4 sm:px-0">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-600 px-4 sm:px-0">No upcoming events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 px-4 sm:px-0">
            {events.map((event, index) => {
              const eventTitle = event.title || event.name || 'Untitled Event';
              const eventDate = formatEventDate(event.startDate || event.date, event.endDate);
              const ageGroups = toAgeGroupList(event.ageGroups);
              const eventLocation = [event.location, event.state].filter(Boolean).join(', ');
              const eventImage = resolveImageSrc(event.image, PLACEHOLDER_IMAGES.event);

              return (
                <motion.div
                  key={event.id || `${eventTitle}-${index}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                  className="card-glass rounded-xl overflow-hidden group"
                >
                  {/* Event image with hover zoom */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${eventImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      aria-label={eventTitle}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {ageGroups.map((group) => (
                          <span
                            key={`${event.id}-${group}`}
                            className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-white bg-white/[0.1] backdrop-blur-sm border border-white/[0.1]"
                          >
                            {group}
                          </span>
                        ))}
                        {event.competitionLevel && (
                          <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-white bg-white/[0.1] backdrop-blur-sm border border-white/[0.1]">
                            {event.competitionLevel}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black tracking-tight text-white">{eventTitle}</h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center text-gray-500 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-[#FF2247]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span className="text-sm">{eventDate}</span>
                    </div>
                    <div className="flex items-start text-gray-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 mt-0.5 text-[#FF2247]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span className="text-sm">{eventLocation || 'Location TBD'}</span>
                    </div>

                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{event.description}</p>

                    <Link href="/events" className="btn-primary w-full block text-center text-sm">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Events link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/events" className="text-[#FF2247] font-bold text-sm uppercase tracking-wider hover:text-white transition-colors inline-flex items-center gap-2">
            View All Events
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
