'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { upcomingEvents, availableStates, competitionLevels } from '@/lib/data/upcomingEvents';
import Container from '../shared/Container';

export default function UpcomingEventsList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedState, setSelectedState] = useState('All States');
  const [competitionLevel, setCompetitionLevel] = useState('All Levels');

  // Filter events based on selected criteria
  const filteredEvents = upcomingEvents.filter(event => {
    // Filter by age group if not "All Events"
    const ageGroupMatch = 
      activeFilter === 'All Events' || 
      event.ageGroups.includes(activeFilter);
    
    // Filter by state
    const stateMatch = 
      selectedState === 'All States' || 
      event.state === selectedState;
    
    // Filter by competition level
    const levelMatch =
      competitionLevel === 'All Levels' ||
      (event.competitionLevel && event.competitionLevel === competitionLevel);
    
    return ageGroupMatch && stateMatch && levelMatch;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-[#1A1A1E]" id="upcoming" ref={ref}>
      <Container size = "wide">
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
            Mark your calendars for these exciting hackathons and join a community of young innovators.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-[#16161A] p-6 rounded-xl border border-gray-800 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Filter Events</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex items-center">
              {/* Age Group Filter */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Age Group</label>
                <div className="flex flex-wrap gap-2">
                  {['All Events', 'High School', 'Middle School', 'College'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        activeFilter === filter
                          ? 'bg-[#FF2247] text-white'
                          : 'bg-[#1A1A1E] text-gray-300 hover:bg-[#1E1E22] border border-gray-700'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Competition Level Filter */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Competition Level</label>
                <div className="flex flex-wrap gap-2">
                  {competitionLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setCompetitionLevel(level)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        competitionLevel === level
                          ? 'bg-[#FF2247] text-white'
                          : 'bg-[#1A1A1E] text-gray-300 hover:bg-[#1E1E22] border border-gray-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country Dropdown */}
              <div>
                <label htmlFor="country" className="block text-gray-300 text-sm font-medium mb-2">Country</label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-2.5 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                >
                  <option value="United States">United States</option>
                </select>
              </div>

              {/* State Dropdown */}
              <div>
                <label htmlFor="state" className="block text-gray-300 text-sm font-medium mb-2">State</label>
                <select
                  id="state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-2.5 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                >
                  {availableStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-300 mb-6">
            Showing {filteredEvents.length} events
            {selectedState !== 'All States' && ` in ${selectedState}`}
            {activeFilter !== 'All Events' && ` for ${activeFilter} students`}
            {competitionLevel !== 'All Levels' && ` at ${competitionLevel} level`}
          </div>
        </motion.div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.title}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className="bg-[#16161A] rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
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
                    <span>{event.location} <span className="text-sm text-gray-500">({event.state})</span></span>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{event.description}</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-auto"
                  >
                    <Link href="#registration" className="btn-primary w-full block text-center">
                      Register Now
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-[#16161A] rounded-xl p-12 text-center border border-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No Events Found</h3>
            <p className="text-gray-400 mb-6">There are no events matching your current filters.</p>
            <button 
              onClick={() => {
                setActiveFilter('All Events');
                setSelectedState('All States');
                setCompetitionLevel('All Levels');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/events/past-events" className="text-white hover:text-[#FF2247] inline-flex items-center font-semibold transition-colors">
            <span>View Past Events</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
