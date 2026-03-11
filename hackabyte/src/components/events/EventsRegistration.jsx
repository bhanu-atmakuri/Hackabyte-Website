'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Container from '../shared/Container';

export default function EventsRegistration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#0A0A0C]" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="card-gradient-border rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="relative h-64 md:h-auto min-h-[300px] md:min-h-[400px]"
            >
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(/api/placeholder/800/600)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0C] to-transparent md:bg-gradient-to-r"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 md:p-12 flex flex-col justify-center"
            >
              <span className="label-uppercase mb-4 block">Registration</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4">
                Ready to Join a Hackabyte <span className="heading-gradient">Event?</span>
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Our hackathons are designed for students of all experience levels. Whether you're just starting out or you're an experienced coder, we have challenges that will inspire and engage you.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "No prior coding experience required for our beginner tracks",
                  "All equipment and resources provided during the event",
                  "Scholarships available to ensure accessibility for all students"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded">
                      <svg className="h-3 w-3 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-400 text-sm">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#upcoming" className="btn-primary block text-center">
                  View Upcoming Events
                </Link>
                <Link href="/contact" className="btn-secondary block text-center">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Flexible Time Commitment",
              description: "Our events range from single-day workshops to multi-day hackathons, with options for every schedule."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Team Formation",
              description: "Register individually or with friends. We'll help you find the perfect team if you're coming solo."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "FAQs",
              description: "Check our frequently asked questions for more details about our events, or reach out with specific inquiries.",
              link: { href: "/contact", text: "Ask a Question" }
            }
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="card-glass rounded-xl p-6"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded-lg text-[#FF2247] mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              {card.link && (
                <Link href={card.link.href} className="text-[#FF2247] hover:text-[#ff4667] text-sm font-bold mt-3 inline-block transition-colors">
                  {card.link.text} &rarr;
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
