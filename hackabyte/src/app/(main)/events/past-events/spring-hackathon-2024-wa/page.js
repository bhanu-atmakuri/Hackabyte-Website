'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BasePageLayout from '@/components/shared/BasePageLayout';
import Container from '@/components/shared/Container';
import useNoFlash from '@/lib/hooks/useNoFlash';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';

export default function SpringHackathon2024WA() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>;
  }

  // Event data (in a real app, this would come from an API or CMS)
  const event = {
    title: "Spring Hackathon 2024 - WA",
    date: "April 15-16, 2024",
    location: "DigiPen Institute of Technology, Redmond",
    state: "Washington",
    country: "United States",
    ageGroups: ["High School", "Middle School", "College"],
    competitionLevel: "State",
    image: "/api/placeholder/600/400",
    description: "Our Spring Hackathon 2024 in Washington brought together students from across the state for an intensive weekend of coding, collaboration, and innovation. Participants worked on solutions for real-world challenges.",
    highlights: [
      "Over 120 participants across all age groups",
      "15 completed projects submitted",
      "Workshops led by industry professionals",
      "Keynote speech by tech industry leader"
    ],
    winners: [
      {
        category: "High School Division",
        team: "Code Crushers",
        project: "EcoTrack - Environmental Monitoring System",
        description: "A comprehensive system for monitoring various environmental metrics, including air quality, water purity, and noise pollution. The solution used IoT sensors and provided a user-friendly dashboard for data visualization."
      },
      {
        category: "Middle School Division",
        team: "Young Innovators",
        project: "HealthBuddy - Wellness App for Teens",
        description: "A mobile application designed to help teenagers track their physical and mental health, offering personalized recommendations, mood tracking, and resources for seeking support."
      },
      {
        category: "College Division",
        team: "Algorithm Aces",
        project: "SmartCity Traffic Management",
        description: "An AI-powered traffic management system that optimized traffic light patterns in real-time based on current traffic conditions, reducing congestion and commute times."
      }
    ]
  };

  return (
    <BasePageLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-[#1A1A1E]">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
        </div>
        
        <Container>
          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/events/past-events" className="text-white hover:text-[#FF2247] inline-flex items-center font-semibold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Past Events</span>
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {event.ageGroups.map((group, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FF2247] bg-[#FF2247]/10"
                  >
                    {group}
                  </span>
                ))}
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400 bg-white/[0.05]">
                  {event.competitionLevel}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              
              <div className="flex items-center text-gray-300 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-start text-gray-300 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div>{event.location}</div>
                  <div className="text-sm text-gray-500">{event.state}, {event.country}</div>
                </div>
              </div>
              
              <p className="text-lg text-gray-300">{event.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-lg h-80 md:h-96"
            >
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${resolveImageSrc(event.image, PLACEHOLDER_IMAGES.event)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
            </motion.div>
          </div>
        </Container>
      </section>
      
      {/* Event Highlights */}
      <section className="py-16 bg-[#16161A]">
        <Container>
          <h2 className="text-3xl font-bold text-[#FF2247] mb-8">Event Highlights</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {event.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#1A1A1E] p-5 rounded-xl border border-gray-800"
              >
                <div className="text-[#FF2247] mb-3">
                  {idx === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ) : idx === 1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ) : idx === 2 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  )}
                </div>
                <p className="text-white">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Winners Section */}
      <section className="py-16 bg-[#1A1A1E]">
        <Container>
          <h2 className="text-3xl font-bold text-[#FF2247] mb-8">Winners</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {event.winners.map((winner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#16161A] p-6 rounded-xl border border-gray-800"
              >
                <div className="text-[#FF2247] font-semibold mb-2">
                  {winner.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{winner.team}</h3>
                <h4 className="text-lg text-gray-300 mb-3">{winner.project}</h4>
                <p className="text-gray-400">{winner.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Image Gallery Placeholder */}
      <section className="py-16 bg-[#16161A]">
        <Container>
          <h2 className="text-3xl font-bold text-[#FF2247] mb-8">Event Gallery</h2>
          
          <div className="bg-[#1A1A1E] p-12 rounded-xl border border-gray-800 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">Gallery Coming Soon</h3>
            <p className="text-gray-400 mb-6">We're still processing photos from this event. Check back soon!</p>
          </div>
        </Container>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-[#1A1A1E]">
        <Container>
          <div className="bg-gradient-to-r from-[#F93236] to-[#FF2247] p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Don't Miss Our Next Hackathon!</h3>
            <p className="text-white mb-6 max-w-2xl mx-auto">Registration is now open for upcoming events. Join us for another exciting weekend of coding, learning, and innovation.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/events" className="btn-secondary">
                View Upcoming Events
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </BasePageLayout>
  );
}
