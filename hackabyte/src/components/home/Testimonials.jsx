'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const testimonials = [
    {
      name: "Alex Chen",
      role: "High School Student",
      image: "/api/placeholder/120/120",
      quote: "Participating in Hackabyte's hackathon was a transformative experience. I went from knowing basic HTML to building a full-stack app in just 48 hours! The mentors were incredibly supportive and I made connections that led to my first tech internship.",
      school: "Washington High School"
    },
    {
      name: "Maya Patel",
      role: "Middle School Student",
      image: "/api/placeholder/120/120",
      quote: "I was nervous at first since I had limited coding experience, but the Hackabyte team made it so approachable. They paired me with great teammates and provided resources to help us succeed. Now I'm coding every day!",
      school: "Lincoln Middle School"
    },
    {
      name: "Ethan Williams",
      role: "Elementary School Student",
      image: "/api/placeholder/120/120",
      quote: "The elementary school hackathon was super fun! We got to make games and learn about computers. The helpers were nice and I want to come back next year!",
      school: "Oakridge Elementary"
    },
    {
      name: "Mrs. Johnson",
      role: "Computer Science Teacher",
      image: "/api/placeholder/120/120",
      quote: "As an educator, I've seen firsthand how Hackabyte events inspire students. The hands-on approach and real-world challenges complement classroom learning perfectly, giving students confidence and practical skills.",
      school: "Jefferson High School"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-20 bg-[#16161A]" id="testimonials" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Success Stories
          </h2>
          <div className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear from students and educators who have experienced the
            impact of our hackathons firsthand.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Testimonial Content */}
              <div className="p-8 md:p-12 md:w-3/5 bg-[#131435]">
                <svg className="text-[#FF2247] w-12 h-12 mb-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                </svg>
                
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="testimonial-content"
                >
                  <div className="text-xl text-white mb-6">
                    "{testimonials[activeIndex].quote}"
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      {/* Using a div with background image instead of img tag */}
                      <div 
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${testimonials[activeIndex].image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        aria-label={testimonials[activeIndex].name}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-white">
                        {testimonials[activeIndex].name}
                      </h4>
                      <div className="text-sm text-gray-400">
                        {testimonials[activeIndex].role}, {testimonials[activeIndex].school}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Image Side */}
              <div className="bg-gradient-to-br from-[#F93236] to-[#FF2247] md:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-white text-center">
                    <div className="flex space-x-1 mb-6 justify-center">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === activeIndex ? 'bg-white' : 'bg-white/40'
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handlePrev}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Previous testimonial"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Next testimonial"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}