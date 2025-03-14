/**
 * LUMA Join Component
 * 
 * Application form for joining the LUMA education team with:
 * - Interactive form with validation for collecting applicant information
 * - Success state display after submission
 * - Benefits of joining displayed as visual cards
 * - Custom LUMA branding with distinct color scheme
 * - Responsive layout that adapts to different screen sizes
 * - Scroll-triggered animations for visual engagement
 */

'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../shared/Container';

export default function LumaJoin() {
 // Reference for scroll-triggered animations
 const ref = useRef(null);
 // Detect when section enters viewport (20% visibility triggers animation)
 const isInView = useInView(ref, { once: true, amount: 0.2 });
 
 /**
  * Form state management
  * Tracks user input across multiple form fields
  */
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   experience: '',
   motivation: ''
 });
 
 // Track whether the form has been successfully submitted
 const [submitted, setSubmitted] = useState(false);

 /**
  * Handle form field changes
  * Updates the appropriate property in form state based on input name
  * @param {Event} e - Input change event
  */
 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prev => ({
     ...prev,
     [name]: value
   }));
 };

 /**
  * Handle form submission
  * Processes form data and transitions to success state
  * Would typically send data to a backend API in production
  * @param {Event} e - Form submission event
  */
 const handleSubmit = (e) => {
   e.preventDefault();
   // Here you would typically send the data to your backend
   console.log(formData);
   setSubmitted(true);
 };

 return (
   <section className="py-20 bg-[#16161A]" id="join" ref={ref}>
     <Container size = "half">
       {/* Section heading with fade-in and slide-up animation */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
         transition={{ duration: 0.6 }}
         className="text-center mb-12"
       >
         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#BADA55]">
           Join Team LUMA
         </h2>
         <p className="text-xl text-white max-w-3xl mx-auto">
           Make a difference by becoming a part of our community of passionate educators dedicated to making coding accessible to all.
         </p>
       </motion.div>

       {/* Conditional rendering based on form submission state */}
       {!submitted ? (
         // Application form with animated entrance
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="bg-[#1A1A1E] rounded-xl p-8 border border-gray-800"
         >
           {/* Form with validation and styled inputs */}
           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <label htmlFor="name" className="block text-white font-medium mb-2">Full Name</label>
               <input
                 type="text"
                 id="name"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 required
                 className="w-full px-4 py-3 rounded-lg bg-[#242429] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BADA55] focus:border-transparent"
               />
             </div>
             
             <div>
               <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 required
                 className="w-full px-4 py-3 rounded-lg bg-[#242429] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BADA55] focus:border-transparent"
               />
             </div>
             
             <div>
               <label htmlFor="experience" className="block text-white font-medium mb-2">Coding Experience</label>
               <select
                 id="experience"
                 name="experience"
                 value={formData.experience}
                 onChange={handleChange}
                 required
                 className="w-full px-4 py-3 rounded-lg bg-[#242429] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BADA55] focus:border-transparent"
               >
                 <option value="">Select your experience level</option>
                 <option value="beginner">Beginner (0-1 years)</option>
                 <option value="intermediate">Intermediate (1-3 years)</option>
                 <option value="advanced">Advanced (3+ years)</option>
                 <option value="professional">Professional</option>
               </select>
             </div>
             
             <div>
               <label htmlFor="motivation" className="block text-white font-medium mb-2">Why do you want to join LUMA?</label>
               <textarea
                 id="motivation"
                 name="motivation"
                 value={formData.motivation}
                 onChange={handleChange}
                 required
                 rows="4"
                 className="w-full px-4 py-3 rounded-lg bg-[#242429] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BADA55] focus:border-transparent"
               ></textarea>
             </div>
             
             <div className="flex items-center">
               <input
                 id="terms"
                 type="checkbox"
                 required
                 className="h-4 w-4 text-[#BADA55] focus:ring-[#BADA55] border-gray-700 rounded"
               />
               <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                 I agree to volunteer my time and skills to support LUMA's mission of inclusive coding education
               </label>
             </div>
             
             {/* Submit button with hover animation */}
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               type="submit"
               className="w-full py-3 bg-[#BADA55] text-black font-bold rounded-lg hover:bg-[#a5c544] transition-colors"
             >
               APPLY NOW
             </motion.button>
           </form>
         </motion.div>
       ) : (
         // Success message displayed after submission
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="bg-[#1A1A1E] rounded-xl p-8 border border-[#BADA55] text-center"
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#BADA55] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
           <p className="text-gray-300 mb-6">
             Thank you for your interest in joining Team LUMA. We've received your application and will be in touch with you shortly.
           </p>
           <a href="/contact?subject=Discord%20Inquiry" className="inline-block px-6 py-3 bg-[#BADA55] text-black font-bold rounded-lg hover:bg-[#a5c544] transition-colors">
             Join Our Discord
           </a>
         </motion.div>
       )}
       
       {/* Benefits of joining LUMA section with three-column grid */}
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
         transition={{ duration: 0.6, delay: 0.4 }}
         className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
       >
         <div className="bg-[#1A1A1E] p-6 rounded-lg border border-gray-800">
           <div className="text-[#BADA55] mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>
           </div>
           <h3 className="text-lg font-semibold text-white mb-2">Teach & Mentor</h3>
           <p className="text-gray-400">Share your knowledge and skills with students eager to learn coding and technology.</p>
         </div>
         
         <div className="bg-[#1A1A1E] p-6 rounded-lg border border-gray-800">
           <div className="text-[#BADA55] mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
           <h3 className="text-lg font-semibold text-white mb-2">Make an Impact</h3>
           <p className="text-gray-400">Help bridge the digital divide by making coding education accessible to all students.</p>
         </div>
         
         <div className="bg-[#1A1A1E] p-6 rounded-lg border border-gray-800">
           <div className="text-[#BADA55] mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
           <h3 className="text-lg font-semibold text-white mb-2">Grow Your Skills</h3>
           <p className="text-gray-400">Develop your teaching abilities while strengthening your own technical knowledge and leadership skills.</p>
         </div>
       </motion.div>
     </Container>
   </section>
 );
}
