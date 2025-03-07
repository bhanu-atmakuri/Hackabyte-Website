// hackabyte/src/components/sponsors/SponsorshipOptions.jsx

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function SponsorshipOptions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sponsorshipBenefits = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Access Top Talent",
      description: "Connect with the brightest young minds in tech and build your talent pipeline for internships and entry-level roles."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ), 
      title: "Boost Brand Visibility",
      description: "Showcase your brand to a highly engaged audience of students, educators, and tech enthusiasts."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Support STEM Education",
      description: "Empower the next generation of innovators and demonstrate your commitment to advancing STEM education."
    },
  ];

  const sponsorshipPackages = [
    {
      name: 'Bronze',
      price: '$1,000+',
      features: [
        'Logo on event website',
        'Mention in social media posts',
        'Distribute swag to participants',
      ],
    },
    {
      name: 'Silver',
      price: '$2,500+',
      features: [
        'All Bronze benefits',
        'Logo on event t-shirts',
        'Dedicated sponsor booth',
        'Resume book access',
      ],
      featured: true,
    },
    {
      name: 'Gold',
      price: '$5,000+',
      features: [
        'All Silver benefits',  
        'Award named sponsorship',
        'Speaking opportunity',
        'Virtual tech talk or workshop',
      ],
    },
  ];

  return (
    <section id="sponsorships" className="py-20 bg-[#16161A]" ref={ref}>
      <div className="container-custom max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Sponsorship Opportunities
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Join us in inspiring the tech leaders of tomorrow. Sponsor Hackabyte events to fuel innovation, support emerging talent, and elevate your brand.
          </p>
        </motion.div>

        {/* Sponsorship Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sponsorshipBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800 hover:shadow-lg hover:border-[#FF2247] transition duration-300"
            >
              <div className="text-[#FF2247] mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Sponsorship Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {sponsorshipPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`bg-[#16161A] rounded-xl border ${pkg.featured ? 'border-[#FF2247] shadow-lg scale-105' : 'border-gray-800'} p-8 relative transition duration-300 hover:shadow-lg hover:border-[#FF2247]`}
            >
              {pkg.featured && (
                <div className="absolute top-0 right-0 bg-[#FF2247] text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="text-[#FF2247] font-semibold text-xl mb-4">{pkg.price}</div>
              <ul className="space-y-2 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF2247] mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414