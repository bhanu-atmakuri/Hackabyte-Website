'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission for now
      setFormStatus('loading');
      
      // This timeout simulates an API call
      setTimeout(() => {
        setFormStatus('success');
        
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus(null);
        }, 5000);
      }, 1000);
      
      // TODO: Implement actual form submission logic
      // Example implementation would be:
      /*
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          if (response.ok) {
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
          } else {
            setFormStatus('error');
          }
        } catch (error) {
          setFormStatus('error');
          console.error('Error submitting form:', error);
        }
      */
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
      
      {formStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-800/20 border border-green-800 text-green-300 rounded-md p-4 mb-6"
        >
          Thanks for reaching out! We'll get back to you soon.
        </motion.div>
      )}
      
      {formStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-800/20 border border-red-800 text-red-300 rounded-md p-4 mb-6"
        >
          There was an error sending your message. Please try again later.
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
      </form>
    </motion.div>
  );
}
