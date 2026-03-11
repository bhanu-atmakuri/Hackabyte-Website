'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/shared/Container';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';

export default function UpcomingHackathons() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    <section className="py-24 md:py-32 bg-[#0A0A0C] relative" ref={ref} id="upcoming-hackathons">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Register Now</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Upcoming <span className="heading-gradient">Hackathons</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Register now for our next hackathons and start your journey of innovation and collaboration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.title}
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
                      backgroundImage: `url(${resolveImageSrc(hackathon.image, PLACEHOLDER_IMAGES.event)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/80 to-transparent md:bg-gradient-to-l"></div>
                </div>

                <div className="md:col-span-3 p-6">
                  <h3 className="text-xl font-black tracking-tight text-white mb-2">{hackathon.title}</h3>

                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{hackathon.date}</span>
                  </div>

                  <div className="flex items-start text-gray-400 text-sm mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div>{hackathon.location}</div>
                      <div className="text-gray-600">{hackathon.city}</div>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{hackathon.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <Link href={hackathon.registrationLink} className="btn-primary inline-block text-sm">
                      Sign Up
                    </Link>
                    <Link href="/events/hackathons" className="btn-secondary inline-block text-sm">
                      Learn More
                    </Link>
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
