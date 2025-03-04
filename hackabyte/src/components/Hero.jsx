'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);

  // Parallax effect on scroll
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
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const codeBlockItems = [
    { id: 1, element: '<div className="hackathon">' },
    { id: 2, element: '  <h1>Hello World!</h1>' },
    { id: 3, element: '  <p>Building the future, one line of code at a time.</p>' },
    { id: 4, element: '</div>' }
  ];

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden bg-[#1A1A1E]"
      id="home"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF003C] rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#FF2247]">Hack. Build. Learn.</span>
            </h1>
          </motion.div>

          <motion.div variants={item}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Empowering Young Minds Through Coding Challenges
            </h2>
          </motion.div>

          <motion.div variants={item} className="text-lg text-gray-300 mb-8">
            Hackabyte hosts immersive in-person hackathons for students of all ages, 
            from elementary to high school. Build technical skills, solve real-world problems, 
            and connect with mentors in a collaborative environment.
          </motion.div>

          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/register" className="btn-primary block text-center">
                Register for Next Event
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#learn-more" className="btn-secondary block text-center">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Animated Code Block */}
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-[#1A1A1E] rounded-lg shadow-2xl overflow-hidden border border-gray-800">
            {/* Code Editor Header */}
            <div className="bg-[#16161A] px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-gray-400 text-sm">hackathon.jsx</div>
            </div>
            
            {/* Code Content */}
            <div className="p-6">
              <pre className="text-gray-300 font-mono">
                <code>
                  {codeBlockItems.map((line, index) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.8 + (index * 0.15),
                        ease: "easeOut" 
                      }}
                      className="line"
                    >
                      <span className="text-gray-500 mr-4">{line.id}</span>
                      <span className={line.id === 2 ? "text-[#F93236]" : line.id === 3 ? "text-[#FF2247]" : "text-white"}>
                        {line.element}
                      </span>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 2 }}
                    className="absolute bottom-4 right-4 w-2 h-5 bg-white animate-pulse"
                  />
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}