'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';

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
    <section className="py-24 md:py-32 lg:py-40 bg-[#111114] relative" id="testimonials" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Success <span className="heading-gradient">Stories</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Hear from students and educators who have experienced the
            impact of our hackathons firsthand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="card-glass-strong rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Large quote icon */}
              <svg className="text-[#F93236]/30 w-16 h-16 mb-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
              </svg>

              {/* Animated testimonial content with horizontal slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-light">
                    &ldquo;{testimonials[activeIndex].quote}&rdquo;
                  </p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] overflow-hidden">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${resolveImageSrc(testimonials[activeIndex].image, PLACEHOLDER_IMAGES.avatar)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        aria-label={testimonials[activeIndex].name}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold tracking-tight text-white">
                        {testimonials[activeIndex].name}
                      </h4>
                      <div className="text-sm text-gray-500">
                        {testimonials[activeIndex].role}, {testimonials[activeIndex].school}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.06]">
                {/* Vertical bar navigation dots */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-8 h-1 rounded-full transition-all duration-300 ${
                        index === activeIndex ? 'bg-[#F93236] w-12' : 'bg-white/[0.1] hover:bg-white/[0.2]'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 flex items-center justify-center bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 flex items-center justify-center bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-colors"
                    aria-label="Next testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
