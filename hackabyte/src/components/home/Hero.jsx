'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollY = window.scrollY;
        containerRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const codeBlockItems = [
    { id: 1, element: '<div className="hackathon">' },
    { id: 2, element: '  <h1>Hello World!</h1>' },
    { id: 3, element: '  <p>Building the future, one line at a time.</p>' },
    { id: 4, element: '</div>' }
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 relative overflow-hidden bg-[#0A0A0C] flex items-center"
      id="home"
    >
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#F93236]/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#FF2247]/8 rounded-full blur-[150px] animate-float-slow"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#FF003C]/5 rounded-full blur-[100px]"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <span className="label-uppercase mb-6 block">Youth Hackathon Organization</span>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 md:mb-6 leading-[0.95]">
                <span className="heading-gradient text-glow">HACK.</span>
                <br />
                <span className="text-white">BUILD.</span>
                <br />
                <span className="heading-outline">LEARN.</span>
              </h1>
            </motion.div>

            <motion.div variants={item}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-400 mb-4 md:mb-6">
                Inspiring Innovation, Shaping Tomorrow
              </h2>
            </motion.div>

            <motion.div variants={item} className="text-base md:text-lg text-gray-500 mb-8 md:mb-10 max-w-lg leading-relaxed">
              Hackabyte hosts immersive in-person hackathons for students of all ages,
              from elementary to high school. Build technical skills, solve real-world problems,
              and connect with mentors in a collaborative environment.
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/events#upcoming" className="btn-primary block text-center">
                  Register for Next Event
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/#about" className="btn-secondary block text-center">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Code editor (decorative) */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="card-glass rounded-lg shadow-2xl overflow-hidden glow-red">
              {/* Code editor chrome */}
              <div className="bg-white/[0.03] px-4 py-3 flex items-center border-b border-white/[0.06]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#F93236]/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                </div>
                <div className="ml-4 text-gray-600 text-xs font-mono uppercase tracking-wider">hackathon.jsx</div>
              </div>

              {/* Code content */}
              <div className="p-6">
                <pre className="text-gray-400 font-mono text-sm">
                  <code>
                    {codeBlockItems.map((line, index) => (
                      <motion.div
                        key={line.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 1.0 + (index * 0.15),
                          ease: "easeOut"
                        }}
                        className="leading-7"
                      >
                        <span className="text-gray-700 mr-4 select-none">{line.id}</span>
                        <span className={line.id === 2 ? "text-[#F93236]" : line.id === 3 ? "text-[#FF2247]" : "text-gray-300"}>
                          {line.element}
                        </span>
                      </motion.div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest text-gray-600 mb-3">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
