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
  const [formStatus, setFormStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormStatus('loading');
      setTimeout(() => {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus(null), 5000);
      }, 1000);
    }
  };

  const inputClasses = (fieldName) =>
    `w-full px-4 py-3 bg-white/[0.03] border ${
      errors[fieldName] ? 'border-[#FF2247]' : 'border-white/[0.08] focus:border-[#FF2247]/50'
    } text-white placeholder-gray-600 focus:ring-1 focus:ring-[#FF2247]/30 focus:outline-none transition-colors`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card-glass rounded-xl p-6 md:p-10"
    >
      <h2 className="text-2xl font-black tracking-tight text-white mb-6">Send Us a Message</h2>

      {formStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass rounded-lg p-4 mb-6 border-green-800/50"
        >
          <p className="text-green-400 text-sm">Thanks for reaching out! We'll get back to you soon.</p>
        </motion.div>
      )}

      {formStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass rounded-lg p-4 mb-6 border-red-800/50"
        >
          <p className="text-red-400 text-sm">There was an error sending your message. Please try again later.</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={inputClasses('name')}
          />
          {errors.name && <p className="mt-1.5 text-[#FF2247] text-xs">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={inputClasses('email')}
          />
          {errors.email && <p className="mt-1.5 text-[#FF2247] text-xs">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this regarding?"
            className={inputClasses('subject')}
          />
          {errors.subject && <p className="mt-1.5 text-[#FF2247] text-xs">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            rows="5"
            className={`${inputClasses('message')} resize-none`}
          ></textarea>
          {errors.message && <p className="mt-1.5 text-[#FF2247] text-xs">{errors.message}</p>}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`btn-primary w-full py-3 flex items-center justify-center ${
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
