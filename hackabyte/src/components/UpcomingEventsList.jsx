'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function UpcomingEventsList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedState, setSelectedState] = useState('All States');
  const [eventType, setEventType] = useState('All Types');

  const states = ['All States', 'California', 'Washington'];

  const upcomingEvents = [
    {
      title: "Winter Hackathon - CA",
      date: "March 8-9, 2025",
      location: "Tech Innovation Center, San Francisco",
      state: "California",
      ageGroups: ["High School", "Middle School"],
      image: "/api/placeholder/600/400",
      description: "Join us for our Winter Hackathon in California! This two-day event will feature exciting challenges, workshops, and opportunities to network with tech professionals.",
      registrationLink: "/register/winter-ca-2025",
      eventType: "Hackathon"
    },
    {
      title: "Spring Hackathon - WA",
      date: "March 29-30, 2025",
      location: "DigiPen Institute of Technology, Redmond",
      state: "Washington",
      ageGroups: ["High School", "Middle School"],
      image: "/api/placeholder/600/400",
      description: "Our Spring Hackathon in Washington will be held at DigiPen Institute of Technology. Collaborate with peers and build innovative projects in this intensive weekend event.",
      registrationLink: "/register/spring-wa-2025",
      eventType: "Hackathon"
    },
    {
      title: "Spring Hackathon 2025",
      date: "April 15-17, 2025",
      location: "Tech Innovation Center, San Francisco",
      state: "California",
      ageGroups: ["High School", "Middle School"],
      image: "/api/placeholder/600/400",
      description: "Our flagship event featuring challenges in AI, web development, and game design. Over 200 students will compete for prizes and recognition.",
      registrationLink: "/register/spring-2025",
      eventType: "Hackathon"
    },
    {
      title: "Summer Code Camp",
      date: "June 10-14, 2025",
      location: "University Tech Campus, Boston",
      state: "Massachusetts",
      ageGroups: ["Elementary", "Middle School"],
      image: "/api/placeholder/600/400",
      description: "A week-long immersive experience with daily challenges, workshops, and mentorship. Perfect for beginners and intermediate coders.",
      registrationLink: "/register/summer-2025"
    },
    {
      title: "Tech For Good",
      date: "July 22-24, 2025",
      location: "Community Center, Chicago",
      state: "Illinois",
      ageGroups: ["High School", "Middle School"],
      image: "/api/placeholder/600/400",
      description: "A specialized hackathon focused on developing technology solutions for social and environmental challenges.",
      registrationLink: "/register/tech-good-2025"
    },
    {
      title: "Back To School Coding Bash",
      date: "August 28-29, 2025",
      location: "Edison High School, Seattle",
      state: "Washington",
      ageGroups: ["High School", "Middle School", "Elementary"],
      image: "/api/placeholder/600/400",
      description: "Kick off the school year with a high-energy weekend of coding challenges, perfect for students of all skill levels.",
      registrationLink: "/register/back-to-school-2025"
    },
    {
      title: "Fall Hackathon 2025",
      date: "October 22-24, 2025",
      location: "Downtown Convention Center, Chicago",
      state: "Illinois",
      ageGroups: ["High School", "Middle School", "Elementary"],
      image: "/api/placeholder/600/400",
      description: "Our most inclusive event with challenges for all age groups. Focus on sustainable technology and solutions for social good.",
      registrationLink: "/register/fall-2025"
    },
    {
      title: "Winter Code Jam",
      date: "December 5-6, 2025",
      location: "Virtual Event",
      state: "Online",
      ageGroups: ["High School", "Middle School"],
      image: "/api/placeholder/600/400",
      description: "An online hackathon bringing together students from across the country for a weekend of collaboration and coding.",
      registrationLink: "/register/winter-2025"
    },
    {
      title: "AI Innovation Challenge",
      date: "May 20-22, 2025",
      location: "Tech Hub, Seattle",
      state: "Washington",
      ageGroups: ["High School"],
      image: "/api/placeholder/600/400",
      description: "A specialized hackathon focusing on artificial intelligence and machine learning projects for advanced high school students.",
      registrationLink: "/register/ai-innovation-2025"
    },
    {
      title: "Game Development Expo",
      date: "September 15-17, 2025",
      location: "Gaming Campus, San Francisco",
      state: "California",
      ageGroups: ["High School", "Middle School"],
      image: "/api/placeholder/600/400",
      description: "Learn game development fundamentals and create your own games in this exciting multi-day event with industry mentors.",
      registrationLink: "/register/game-dev-2025"
    }
  ];

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
    
    // Filter by event type
    const typeMatch =
      eventType === 'All Types' ||
      (event.eventType && event.eventType === eventType);
    
    return ageGroupMatch && stateMatch && typeMatch;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-[#1A1A1E]" id="upcoming" ref={ref}>
      <div className="container-custom">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Age Group Filter */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Age Group</label>
                <div className="flex flex-wrap gap-2">
                  {['All Events', 'High School', 'Middle School', 'Elementary'].map((filter) => (
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

              {/* Event Type Filter */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Event Type</label>
                <div className="flex flex-wrap gap-2">
                  {['All Types', 'Hackathon', 'Workshop', 'Camp'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setEventType(type)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        eventType === type
                          ? 'bg-[#FF2247] text-white'
                          : 'bg-[#1A1A1E] text-gray-300 hover:bg-[#1E1E22] border border-gray-700'
                      }`}
                    >
                      {type}
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
                  {states.map(state => (
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
                    <Link href={event.registrationLink} className="btn-primary w-full block text-center">
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
                setEventType('All Types');
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
      </div>
    </section>
  );
}