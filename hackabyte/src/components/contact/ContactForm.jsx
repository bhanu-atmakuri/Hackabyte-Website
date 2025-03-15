/**
 * Contact Form Component
 * 
 * Interactive form that allows users to send messages to Hackabyte with:
 * - Real-time form validation with error messaging
 * - Visual feedback for form submission states (loading, success, error)
 * - Animated form elements and status messages
 * - Responsive design that adapts to screen sizes
 * - Clean form reset after successful submission
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function ContactForm() {
  // Form field state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Error state for form validation feedback
  const [errors, setErrors] = useState({});
  
  // Form submission status - can be 'loading', 'success', 'error', or null
  const [formStatus, setFormStatus] = useState(null);

  /**
   * Form validation function
   * Checks all form fields for required values and proper formatting
   * Sets error messages for invalid fields
   * @returns {boolean} - Returns true if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Input change handler
   * Updates form state and clears related error messages when user types
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  /**
   * Form submission handler
   * Validates form, shows loading state, and submits to API
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Show loading state while form processes
      setFormStatus('loading');
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        
          if (result.success) {
            toast.success('Thanks for reaching out! We\'ll get back to you soon.');
            
            // Reset form after success
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: ''
            });
            
            setFormStatus(null);
          } else {
            toast.error(result.message || 'There was an error sending your message. Please try again later.');
            setFormStatus(null);
          }
      } catch (error) {
        setFormStatus('error');
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1E1E24] p-6 md:p-10 rounded-lg shadow-xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Send Us a Message</h2>
      
      {/* Success message notification - appears after successful form submission */}
      {formStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-800/20 border border-green-800 text-green-300 rounded-md p-4 mb-6"
        >
          Thanks for reaching out! We'll get back to you soon.
        </motion.div>
      )}
      
      {/* Error message notification - appears if form submission fails */}
      {formStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-800/20 border border-red-800 text-red-300 rounded-md p-4 mb-6"
        >
          There was an error sending your message. Please try again later.
        </motion.div>
      )}
      
      {/* Contact form with validation and animated feedback */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name input field with validation */}
        <div>
          <label 
            htmlFor="name" 
            className="block text-gray-300 mb-2 text-lg"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`w-full px-4 py-3 rounded-md bg-[#26262C] border focus:ring-2 focus:outline-none text-white ${
              errors.name ? 'border-[#FF2247]' : 'border-gray-700 focus:ring-[#FF2247]/50'
            }`}
          />
          {errors.name && (
            <p className="mt-2 text-[#FF2247]">{errors.name}</p>
          )}
        </div>
        
        {/* Email input field with validation */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-gray-300 mb-2 text-lg"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-3 rounded-md bg-[#26262C] border focus:ring-2 focus:outline-none text-white ${
              errors.email ? 'border-[#FF2247]' : 'border-gray-700 focus:ring-[#FF2247]/50'
            }`}
          />
          {errors.email && (
            <p className="mt-2 text-[#FF2247]">{errors.email}</p>
          )}
        </div>
        
        {/* Subject input field with validation */}
        <div>
          <label 
            htmlFor="subject" 
            className="block text-gray-300 mb-2 text-lg"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this regarding?"
            className={`w-full px-4 py-3 rounded-md bg-[#26262C] border focus:ring-2 focus:outline-none text-white ${
              errors.subject ? 'border-[#FF2247]' : 'border-gray-700 focus:ring-[#FF2247]/50'
            }`}
          />
          {errors.subject && (
            <p className="mt-2 text-[#FF2247]">{errors.subject}</p>
          )}
        </div>
        
        {/* Message textarea with validation */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-gray-300 mb-2 text-lg"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            rows="5"
            className={`w-full px-4 py-3 rounded-md bg-[#26262C] border focus:ring-2 focus:outline-none text-white resize-none ${
              errors.message ? 'border-[#FF2247]' : 'border-gray-700 focus:ring-[#FF2247]/50'
            }`}
          ></textarea>
          {errors.message && (
            <p className="mt-2 text-[#FF2247]">{errors.message}</p>
          )}
        </div>
        
        {/* Submit button with loading state and animations */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`btn-primary w-full py-3 text-xl flex items-center justify-center ${
            formStatus === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={formStatus === 'loading'}
        >
          {formStatus === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </motion.button>
        
        <div className="mt-6 p-4 bg-[#26262C] rounded-md border border-gray-700">
          <div className="flex items-center mb-2">
            <svg className="h-5 w-5 text-[#FF2247] mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3864-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"></path>
            </svg>
            <span className="text-white font-semibold">Need a quicker response?</span>
          </div>
          <p className="text-gray-300 mb-2">
            Join our <a href="https://discord.gg/drXX4sZmbX" target="_blank" rel="noopener noreferrer" className="text-[#FF2247] hover:underline">Discord community</a> for faster support and connect with the Hackabyte team directly.
          </p>
        </div>
      </form>
    </motion.div>
  );
}
