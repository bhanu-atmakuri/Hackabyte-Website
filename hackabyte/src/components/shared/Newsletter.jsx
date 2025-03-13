'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from './Container';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically handle the form submission to a backend service
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-12 xs:py-16 md:py-20 bg-[#16161A] text-white relative overflow-hidden" id="contact" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#F93236]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FF2247]/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Use normal container on mobile, half on larger screens */}
      <Container size="default" className="relative z-10 md:max-w-[700px] lg:max-w-[800px]">
        <div className="mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-3 xs:mb-6 text-[#FF2247]">
              Stay Updated on Future Hackathons
            </h2>
            <div className="text-base xs:text-lg md:text-xl text-gray-300 mb-6 xs:mb-8">
              Subscribe to our newsletter to receive information about upcoming events, 
              coding resources, and success stories from our community.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 xs:px-6 py-3 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-transparent transition-all text-sm xs:text-base"
                    style={{ minHeight: '44px' }} /* Minimum touch target size */
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 xs:px-6 py-3 bg-gradient-to-r from-[#F93236] to-[#FF2247] rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all xs:whitespace-nowrap text-sm xs:text-base"
                    style={{ minHeight: '44px' }} /* Minimum touch target size */
                  >
                    Subscribe Now
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#141416]/30 backdrop-blur-sm rounded-lg p-5 xs:p-8 border border-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 xs:h-12 xs:w-12 text-green-400 mx-auto mb-3 xs:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl xs:text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-sm xs:text-base text-gray-300">
                  You've successfully subscribed to our newsletter. We'll keep you updated on all our future events!
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 xs:mt-12 flex flex-wrap justify-center gap-3 xs:gap-6"
          >
            <a 
              href="https://facebook.com/hackabyte" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-white transition-colors px-2 py-1"
              style={{ minHeight: '44px' }} /* Minimum touch target size */
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xs:h-6 xs:w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
              <span className="text-sm xs:text-base">Facebook</span>
            </a>
            <a 
              href="https://twitter.com/hackabyte" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-white transition-colors px-2 py-1"
              style={{ minHeight: '44px' }} /* Minimum touch target size */
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xs:h-6 xs:w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              <span className="text-sm xs:text-base">Twitter</span>
            </a>
            <a 
              href="https://instagram.com/hackabyte" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-white transition-colors px-2 py-1"
              style={{ minHeight: '44px' }} /* Minimum touch target size */
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xs:h-6 xs:w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-sm xs:text-base">Instagram</span>
            </a>
            <a 
              href="https://linkedin.com/company/hackabyte" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-300 hover:text-white transition-colors px-2 py-1"
              style={{ minHeight: '44px' }} /* Minimum touch target size */
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xs:h-6 xs:w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="text-sm xs:text-base">LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
