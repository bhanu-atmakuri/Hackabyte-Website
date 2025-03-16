/**
 * Upcoming Events List Component
 * 
 * A comprehensive listing of all upcoming hackathon events with advanced filtering capabilities.
 * Features include:
 * - Multi-criteria filtering (age group, location, competition level)
 * - Responsive grid layout that adapts to different screen sizes
 * - Interactive filter UI with toggle buttons and dropdowns
 * - Animated event cards with hover effects
 * - Empty state handling when no events match filter criteria
 * - Links to event registration and past events
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '../shared/Container';

// Fallback data in case API fails
const FALLBACK_EVENTS = [
  {
    _id: 'fallback-1',
    name: 'Spring Hackathon 2025 - WA',
    startDate: '2025-03-29T00:00:00.000Z',
    endDate: '2025-03-30T00:00:00.000Z',
    location: 'DigiPen Institute of Technology, Redmond',
    state: 'Washington',
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
    state: 'California',
    description: 'A week-long immersive coding experience for students of all skill levels, featuring workshops and hands-on projects.',
    image: '/api/placeholder/800/400',
    ageGroups: ['High School'],
    competitionLevel: 'Intermediate'
  },
  {
    _id: 'fallback-3',
    name: 'Fall Hackathon 2025 - NY',
    startDate: '2025-10-10T00:00:00.000Z',
    endDate: '2025-10-12T00:00:00.000Z',
    location: 'NYU Tandon School of Engineering, Brooklyn',
    state: 'New York',
    description: 'Experience the energy of NYC while participating in our Fall Hackathon, featuring challenges from leading tech companies.',
    image: '/api/placeholder/800/400',
    ageGroups: ['High School', 'College'],
    competitionLevel: 'Advanced'
  }
];

export default function UpcomingEventsList() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Events data states
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableStates, setAvailableStates] = useState(['All States']);
  const [competitionLevels, setCompetitionLevels] = useState(['All Levels']);
  
  // Filter state variables
  const [activeFilter, setActiveFilter] = useState('All Events'); // Age group filter
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Country filter (currently single option)
  const [selectedState, setSelectedState] = useState('All States'); // State filter
  const [competitionLevel, setCompetitionLevel] = useState('All Levels'); // Competition level filter
  
  // Fetch events from API
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
        
        console.log('Fetching events list from:', apiUrl);
        
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
            
            // Extract available states from events
            const states = ['All States', ...new Set(data.events
              .map(event => event.state)
              .filter(Boolean))];
            setAvailableStates(states);
            
            // Extract competition levels from events
            const levels = ['All Levels', ...new Set(data.events
              .map(event => event.competitionLevel)
              .filter(Boolean))];
            setCompetitionLevels(levels);
          } else {
            console.log('No events from API, using fallback');
            setEvents(FALLBACK_EVENTS);
            
            // Extract states from fallback data
            const states = ['All States', ...new Set(FALLBACK_EVENTS
              .map(event => event.state)
              .filter(Boolean))];
            setAvailableStates(states);
            
            // Extract competition levels from fallback data
            const levels = ['All Levels', ...new Set(FALLBACK_EVENTS
              .map(event => event.competitionLevel)
              .filter(Boolean))];
            setCompetitionLevels(levels);
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        if (isMounted) {
          console.log('Error occurred, using fallback data');
          setEvents(FALLBACK_EVENTS);
          
          // Extract states from fallback data
          const states = ['All States', ...new Set(FALLBACK_EVENTS
            .map(event => event.state)
            .filter(Boolean))];
          setAvailableStates(states);
          
          // Extract competition levels from fallback data
          const levels = ['All Levels', ...new Set(FALLBACK_EVENTS
            .map(event => event.competitionLevel)
            .filter(Boolean))];
          setCompetitionLevels(levels);
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

  /**
   * Event filtering logic
   * Filters events based on multiple criteria: age group, state, and competition level
   */
  const filteredEvents = events.filter(event => {
    // Filter by age group if not "All Events"
    const ageGroupMatch = 
      activeFilter === 'All Events' || 
      (event.ageGroups && event.ageGroups.includes(activeFilter));
    
    // Filter by state
    const stateMatch = 
      selectedState === 'All States' || 
      (event.state && event.state === selectedState);
    
    // Filter by competition level
    const levelMatch =
      competitionLevel === 'All Levels' ||
      (event.competitionLevel && event.competitionLevel === competitionLevel);
    
    return ageGroupMatch && stateMatch && levelMatch;
  });
  
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

  // Animation variants for event cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-[#1A1A1E]" id="upcoming" ref={ref}>
        <Container size="wide">
          <div className="text-center mb-10 md:mb-16 px-4 sm:px-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
              Upcoming Events
            </h2>
            <div className="animate-pulse bg-gray-700 h-6 w-96 mx-auto rounded mb-4"></div>
          </div>
          
          <div className="bg-[#16161A] p-6 rounded-xl border border-gray-800 mb-6 mx-4 sm:mx-0 animate-pulse">
            <div className="h-16"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
            {[1, 2, 3].map(i => (
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
    <section className="py-16 md:py-20 bg-[#1A1A1E]" id="upcoming" ref={ref}>
      <Container size="wide">
        {/* Section heading with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 px-4 sm:px-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Upcoming Events
          </h2>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
            Mark your calendars for these exciting hackathons and join a community of young innovators.
          </p>
        </motion.div>

        {/* Interactive Filter Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-[#16161A] p-4 md:p-6 rounded-xl border border-gray-800 mb-4 md:mb-6 mx-4 sm:mx-0">
            <h3 className="text-xl font-bold text-white mb-4">Filter Events</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 flex items-center">
              {/* Age Group Filter - Toggle buttons */}
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

              {/* Competition Level Filter - Toggle buttons */}
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

              {/* Country Dropdown - Currently limited to United States */}
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

              {/* State Dropdown - Dynamic options based on available event locations */}
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

          {/* Results Count - Dynamic text showing active filters */}
          <div className="text-gray-300 mb-6">
            Showing {filteredEvents.length} events
            {selectedState !== 'All States' && ` in ${selectedState}`}
            {activeFilter !== 'All Events' && ` for ${activeFilter} students`}
            {competitionLevel !== 'All Levels' && ` at ${competitionLevel} level`}
          </div>
        </motion.div>

        {/* Conditional rendering based on filter results */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 sm:px-0">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className="bg-[#16161A] rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300 flex flex-col"
              >
                {/* Event card image with overlay and tags */}
                <div className="relative h-48 overflow-hidden">
                  {/* Using div with background image instead of img to avoid Next.js hydration issues */}
                  <div 
                    className="absolute inset-0 transition-transform duration-500 hover:scale-110"
                    style={{
                      backgroundImage: `url(${event.image || '/api/placeholder/600/400'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    aria-label={event.title || event.name}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
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
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-400 mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {formatDateRange(event.startDate, event.endDate)}
                  </div>
                <div className="flex items-start text-gray-400 mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{event.location} {event.state && <span className="text-sm text-gray-500">({event.state})</span>}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 sm:mb-6">{event.description}</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-auto pt-3 sm:pt-6"
                  >
                    <Link 
                      href={event._id ? `/events/${event._id}/register` : '/events'} 
                      className="btn-primary w-full block text-center"
                    >
                      Sign Up Now
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
        
        {/* Link to past events with animation */}
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
