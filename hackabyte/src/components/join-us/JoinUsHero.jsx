'use client';

import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function JoinUsHero() {
  const cards = [
    {
      href: "#mentor",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Mentor",
      description: "Share your knowledge and guide students"
    },
    {
      href: "#volunteer",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Volunteer",
      description: "Help run our events and support students"
    },
    {
      href: "#sponsor",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sponsor",
      description: "Support our mission with financial resources"
    }
  ];

  return (
    <section className="relative pt-32 md:pt-40 pb-24 bg-[#0A0A0C] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-uppercase mb-6 block">Get Involved</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Join <span className="heading-gradient">Us</span>
            </h1>

            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Become part of our mission to inspire the next generation of innovators and empower young minds through coding challenges and collaboration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {cards.map((card, index) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="card-glass rounded-xl p-6 flex flex-col items-center group hover:border-[#FF2247]/30 transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded-lg text-[#FF2247] mb-4 group-hover:bg-[#F93236]/20 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white mb-1">{card.title}</h3>
                  <p className="text-gray-500 text-sm text-center">{card.description}</p>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 max-w-3xl mx-auto text-gray-400 leading-relaxed"
            >
              By contributing your time, expertise, or resources, you'll help build a more inclusive
              and diverse tech community while inspiring the next generation of innovators.
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
