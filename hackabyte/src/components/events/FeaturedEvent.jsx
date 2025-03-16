/**
 * Featured Event Component
 * 
 * Displays a prominent showcase of the most significant upcoming Hackabyte event
 * with rich visual presentation and detailed information. Features include:
 * - Eye-catching section heading
 * - Large feature image with gradient overlay
 * - Detailed event information with date, location, and description
 * - Animated highlights list with custom icons
 * - Call-to-action button for registration
 * - Scroll-triggered animations for visual engagement
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '../shared/Container';

// Fallback data in case API fails
const FALLBACK_EVENT = {
  title: "Spring Hackathon - WA",
  date: "March 29-30, 2025",
  location: "DigiPen Institute of Technology, Redmond",
  image: "/api/placeholder/800/400",
  description: "Our Spring Hackathon in Washington will be held at DigiPen Institute of Technology. Collaborate with peers and build innovative projects in this intensive weekend event.",
  highlights: [
    "Mentorship from industry leaders",
    "Beginner to advanced tracks for all age groups",
    "Networking opportunities with tech companies",
    "Special workshop sessions on emerging technologies",
    "Exciting prizes for top projects"
  ],
  registrationLink: "/events#registration"
};

export default function FeaturedEvent() {
  // State for the featured event data
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Fetch the featured event from the API
  useEffect(() => {
    let isMounted = true;
    
    async function fetchFeaturedEvent() {
      try {
        // Get the base URL dynamically
        const baseUrl = typeof window !== 'undefined' 
          ? `${window.location.protocol}//${window.location.host}`
          : '';
          
        // Try using the absolute URL with dynamic origin
        const apiUrl = `${baseUrl}/api/events?status=upcoming`;
        
        console.log('Fetching featured event from:', apiUrl);
        
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
            // Find the Spring Hackathon - WA event
            const springWaEvent = data.events.find(event => 
              event.name && event.name.includes('Spring Hackathon') && 
              event.state && event.state.includes('Washington')
            );
            
            // If found, set as featured, otherwise use first event
            if (springWaEvent) {
              console.log('Spring WA Event found:', springWaEvent);
              setFeaturedEvent({
                id: springWaEvent._id, // Store the ID separately
                title: springWaEvent.name,
                date: formatDateRange(springWaEvent.startDate, springWaEvent.endDate),
                location: springWaEvent.location,
                image: springWaEvent.image || "/api/placeholder/800/400",
                description: springWaEvent.description,
                highlights: [
                  "Mentorship from industry leaders",
                  "Beginner to advanced tracks for all age groups",
                  "Networking opportunities with tech companies",
                  "Special workshop sessions on emerging technologies",
                  "Exciting prizes for top projects"
                ],
                registrationLink: springWaEvent._id ? `/events/${springWaEvent._id}/register` : "/events"
              });
            } else {
              // Fallback to first event if Washington event not found
              const firstEvent = data.events[0];
              console.log('Using first event:', firstEvent);
              setFeaturedEvent({
                id: firstEvent._id, // Store the ID separately
                title: firstEvent.name,
                date: formatDateRange(firstEvent.startDate, firstEvent.endDate),
                location: firstEvent.location,
                image: firstEvent.image || "/api/placeholder/800/400",
                description: firstEvent.description,
                highlights: [
                  "Mentorship from industry leaders",
                  "Beginner to advanced tracks for all age groups",
                  "Networking opportunities with tech companies",
                  "Special workshop sessions on emerging technologies",
                  "Exciting prizes for top projects"
                ],
                registrationLink: firstEvent._id ? `/events/${firstEvent._id}/register` : "/events"
              });
            }
          } else {
            console.log('No events from API, using fallback');
            setFeaturedEvent(FALLBACK_EVENT);
          }
        }
      } catch (error) {
        console.error('Error fetching featured event:', error);
        if (isMounted) {
          // Fallback to static data if API fails
          console.log('Error occurred, using fallback data');
          setFeaturedEvent(FALLBACK_EVENT);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    fetchFeaturedEvent();
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);
  
  // Helper function to format date range
  function formatDateRange(startDate, endDate) {
    if (!startDate || !endDate) return "";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
    } else {
      return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
    }
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-[#16161A]" ref={ref}>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
              Featured Event
            </h2>
            <div className="animate-pulse bg-gray-700 h-6 w-64 mx-auto rounded"></div>
          </div>
          <div className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800 animate-pulse">
            <div className="h-96"></div>
          </div>
        </Container>
      </section>
    );
  }
  
  // Return null if there's no featured event
  if (!featuredEvent) {
    return null;
  }

  // Animation variants for the featured event card
  const featureAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 bg-[#16161A]" ref={ref}>
      <Container>
        {/* Section heading with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Featured Event
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Don't miss our most anticipated hackathon of the year
          </p>
        </motion.div>

        {/* Main featured event card with responsive grid layout */}
        <div className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Event Image - Takes up 2/5 of the grid on medium+ screens */}
            <motion.div
              className="md:col-span-2 relative h-64 md:h-full min-h-[300px]"
              variants={featureAnimation}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div 
                className="absolute inset-0 w-full h-full bg-gray-800"
                style={{
                  backgroundImage: `url(${featuredEvent.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1E]/80 via-transparent to-transparent md:bg-gradient-to-l"></div>
            </motion.div>

            {/* Event Details - Takes up 3/5 of the grid on medium+ screens */}
            <motion.div 
              className="md:col-span-3 p-8 md:p-12"
              variants={featureAnimation}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-white mb-3">{featuredEvent.title}</h3>
              
              {/* Event date and location with icons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {featuredEvent.date}
                </div>
                <div className="flex items-center text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {featuredEvent.location}
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                {featuredEvent.description}
              </p>

              {/* Event highlights with animated list items */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Highlights:</h4>
                <ul className="space-y-2">
                  {featuredEvent.highlights.map((highlight, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    >
                      <svg className="h-5 w-5 text-[#FF2247] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA button with hover animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link href={featuredEvent.registrationLink} className="btn-primary">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
