/**
 * Upcoming Hackathons Component
 * 
 * Displays upcoming hackathon events with detailed information and registration options:
 * - Grid layout showcasing scheduled hackathons in different locations
 * - Rich detail cards with event date, location, and description
 * - Visual elements with images and consistent branding
 * - Direct links to registration and more information
 * - Interactive hover effects and animations
 * - Responsive design that adapts to different screen sizes
 */

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/shared/Container';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';

export default function UpcomingHackathons() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  /**
   * Upcoming hackathons data structure
   * Contains information about scheduled hackathon events with dates, locations, and details
   */
  const upcomingHackathons = [
    {
      title: "Winter Hackathon - CA",
      date: "March 8-9, 2025",
      location: "DigiPen Institute of Technology",
      city: "San Francisco, CA",
      description: "Join us for our Winter Hackathon in California! This two-day event will feature exciting challenges, workshops, and opportunities to network with tech professionals.",
      image: "/api/placeholder/600/400",
      registrationLink: "/events#registration"
    },
    {
      title: "Spring Hackathon - WA",
      date: "March 29-30, 2025",
      location: "DigiPen Institute of Technology",
      city: "Redmond, WA",
      description: "Our Spring Hackathon in Washington will be held at DigiPen Institute of Technology. Collaborate with peers and build innovative projects in this intensive weekend event.",
      image: "/api/placeholder/600/400",
      registrationLink: "/events#registration"
    }
  ];

  return (
    <section className="py-20 bg-[#16161A]" ref={ref} id="upcoming-hackathons">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Upcoming Hackathons
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Register now for our next hackathons and start your journey of innovation and collaboration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Hackathon Image */}
                <div className="md:col-span-2 relative h-48 md:h-full min-h-[200px]">
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${resolveImageSrc(hackathon.image, PLACEHOLDER_IMAGES.event)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1E]/80 to-transparent md:bg-gradient-to-l"></div>
                </div>

                {/* Hackathon Details */}
                <div className="md:col-span-3 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{hackathon.title}</h3>
                  
                  <div className="flex items-center text-gray-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{hackathon.date}</span>
                  </div>
                  
                  <div className="flex items-start text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div>{hackathon.location}</div>
                      <div className="text-sm text-gray-500">{hackathon.city}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{hackathon.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={hackathon.registrationLink} className="btn-primary inline-block">
                        Sign Up
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="/events/hackathons" className="btn-secondary inline-block">
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
