'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { upcomingEvents } from '@/lib/data/upcomingEvents';

export default function EventsCalendar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeMonth, setActiveMonth] = useState('May'); // Default to May

  // Define all months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Function to convert event date strings to month-based organization
  const getEventsByMonth = () => {
    // Initialize all months with empty arrays
    const eventMap = {};
    months.forEach(month => {
      eventMap[month] = [];
    });

    // Process events from the upcomingEvents data
    upcomingEvents.forEach(event => {
      // Extract month from date (assuming format like "March 8-9, 2025")
      const dateString = event.date;
      const monthName = dateString.split(' ')[0];
      
      if (months.includes(monthName)) {
        // Extract date range
        const datePart = dateString.split(',')[0];
        const dateRange = datePart.substring(monthName.length).trim();
        
        eventMap[monthName].push({
          date: dateRange,
          title: event.title,
          location: event.location,
          type: event.eventType || 'Event'
        });
      }
    });

    return eventMap;
  };

  // Get events organized by month
  const eventsByMonth = getEventsByMonth();

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'Hackathon':
        return 'bg-[#F93236]';
      case 'Workshop':
        return 'bg-[#333333]';
      case 'Challenge':
        return 'bg-[#FF2247]';
      case 'Championship':
        return 'bg-gradient-to-r from-[#F93236] to-[#FF2247]';
      case 'Camp':
        return 'bg-[#444444]';
      case 'Networking':
        return 'bg-[#555555]';
      default:
        return 'bg-[#333333]';
    }
  };

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
            Events Calendar
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Plan ahead with our complete schedule of events for the year
          </p>
        </motion.div>

        {/* Month Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto"
        >
          {months.map(month => (
            <button 
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeMonth === month 
                  ? 'bg-[#FF2247] text-white' 
                  : 'bg-[#1A1A1E] text-gray-400 hover:text-white border border-gray-800 hover:border-[#FF2247]/30'
              }`}
            >
              {month}
            </button>
          ))}
        </motion.div>

        {/* Calendar Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#1A1A1E] rounded-xl border border-gray-800 overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-6">{activeMonth} 2025</h3>

            {eventsByMonth[activeMonth].length > 0 ? (
              <div className="space-y-4">
                {eventsByMonth[activeMonth].map((event, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-start sm:items-center flex-col sm:flex-row sm:space-x-4 p-4 rounded-lg bg-[#16161A] hover:bg-[#1E1E22] transition-colors border border-gray-800"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-0 text-center font-bold text-white text-sm leading-tight bg-[#131313]">
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                        <span className={`text-xs px-3 py-1 rounded-full text-white mt-2 sm:mt-0 inline-block ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        <span className="inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </span>
                      </p>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="sm:flex-shrink-0 mt-4 sm:mt-0 w-full sm:w-auto"
                    >
                      <a href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`} className="btn-primary text-sm py-2 px-4 w-full sm:w-auto inline-block text-center">
                        Details
                      </a>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-400">No events scheduled for {activeMonth}.</p>
                <button onClick={() => setActiveMonth('May')} className="text-[#FF2247] hover:underline mt-4">
                  Check other months
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#F93236] inline-block mr-2"></span>
            <span className="text-sm text-gray-300">Hackathon</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#333333] inline-block mr-2"></span>
            <span className="text-sm text-gray-300">Workshop</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#FF2247] inline-block mr-2"></span>
            <span className="text-sm text-gray-300">Challenge</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#444444] inline-block mr-2"></span>
            <span className="text-sm text-gray-300">Camp</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#F93236] to-[#FF2247] inline-block mr-2"></span>
            <span className="text-sm text-gray-300">Championship</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#555555] inline-block mr-2"></span>
            <span className="text-sm text-gray-300">Networking</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}