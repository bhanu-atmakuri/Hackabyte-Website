'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '../shared/Container';

export default function FeaturedEvent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const featuredEvent = {
    title: "National Coding Championship 2025",
    date: "May 15-17, 2025",
    location: "Tech Innovation Center, San Francisco",
    image: "/api/placeholder/800/400",
    description: "Our flagship event brings together the top young coders from across the country for an epic three-day hackathon. With challenges designed for all skill levels and age groups, this championship celebrates creativity, collaboration, and code.",
    highlights: [
      "Over $10,000 in prizes and scholarships",
      "Mentorship from industry leaders",
      "Beginner to advanced tracks for all age groups",
      "Networking opportunities with tech companies",
      "Special keynote from renowned tech innovators"
    ],
    registrationLink: "/events#registration"
  };

  const featureAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-10 xs:py-12 sm:py-16 md:py-20 bg-[#16161A]" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 xs:mb-10 sm:mb-12"
        >
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-3 xs:mb-4 text-[#FF2247]">
            Featured Event
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-white max-w-3xl mx-auto">
            Don't miss our most anticipated hackathon of the year
          </p>
        </motion.div>

        <div className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800">
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-0">
            {/* Event Image - Takes up 2/5 of the space on medium+ screens */}
            <motion.div
              className="sm:col-span-1 md:col-span-2 relative h-48 xs:h-56 sm:h-64 md:h-full min-h-[200px] xs:min-h-[250px] sm:min-h-[300px]"
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

            {/* Event Details - Takes up 3/5 of the space on medium+ screens */}
            <motion.div 
              className="sm:col-span-1 md:col-span-3 p-5 xs:p-6 sm:p-8 md:p-12"
              variants={featureAnimation}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-2 xs:mb-3">{featuredEvent.title}</h3>
              
              <div className="flex flex-wrap gap-2 xs:gap-4 mb-4 xs:mb-6">
                <div className="flex items-center text-gray-300 text-sm xs:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 xs:h-5 xs:w-5 mr-1 xs:mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {featuredEvent.date}
                </div>
                <div className="flex items-center text-gray-300 text-sm xs:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 xs:h-5 xs:w-5 mr-1 xs:mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {featuredEvent.location}
                </div>
              </div>

              <p className="text-sm xs:text-base text-gray-300 mb-4 xs:mb-6">
                {featuredEvent.description}
              </p>

              <div className="mb-5 xs:mb-6 sm:mb-8">
                <h4 className="text-lg xs:text-xl font-semibold text-white mb-2 xs:mb-4">Highlights:</h4>
                <ul className="space-y-1 xs:space-y-2">
                  {featuredEvent.highlights.map((highlight, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start text-gray-300 text-sm xs:text-base"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    >
                      <svg className="h-4 w-4 xs:h-5 xs:w-5 text-[#FF2247] mr-1 xs:mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block w-full xs:w-auto"
              >
                <Link href={featuredEvent.registrationLink} className="btn-primary block w-full xs:w-auto text-center">
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
