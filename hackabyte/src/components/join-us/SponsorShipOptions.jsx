/**
 * Sponsorship Options Component
 * 
 * Displays sponsorship opportunities for Hackabyte events featuring:
 * - Tiered sponsorship packages with pricing and benefits
 * - In-kind sponsorship options for non-financial contributions
 * - Value proposition for potential partners
 * - Contact information and inquiry form link
 * - Animated sections with scroll-triggered reveals
 * - Responsive layouts that adapt to different screen sizes
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function SponsorshipOptions() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (5% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  /**
   * Sponsorship tiers data structure
   * Each tier includes level name, price range, benefits list, and color theme
   */
  const sponsorshipTiers = [
    {
      tier: "Platinum",
      price: "$5,000+",
      features: [
        "Prime logo placement on all event materials",
        "Dedicated booth/table at all events",
        "5-minute speaking opportunity at opening ceremony",
        "Company-branded prizes and challenges",
        "Access to participant resumes",
        "Social media features and press mentions",
        "Option to send recruiters/mentors",
        "Up to 5 branded workshops throughout the year"
      ],
      color: "from-[#F93236] to-[#FF2247]"
    },
    {
      tier: "Gold",
      price: "$2,500+",
      features: [
        "Prominent logo placement on event materials",
        "Booth/table at events",
        "2-minute speaking opportunity",
        "Company swag in participant welcome kits",
        "Access to participant resumes",
        "Social media features",
        "Option to send recruiters/mentors",
        "Up to 3 branded workshops"
      ],
      color: "from-[#FFA500] to-[#FF8C00]"
    },
    {
      tier: "Silver",
      price: "$1,000+",
      features: [
        "Logo on event materials and website",
        "Shared booth space at events",
        "Company swag in participant welcome kits",
        "Social media mentions",
        "Option to send mentors",
        "1 branded workshop"
      ],
      color: "from-[#C0C0C0] to-[#A9A9A9]"
    },
    {
      tier: "Bronze",
      price: "$500+",
      features: [
        "Logo on event website",
        "Social media mention",
        "Option to provide branded items for welcome kits"
      ],
      color: "from-[#CD7F32] to-[#B87333]"
    }
  ];

  /**
   * In-kind sponsorship options data structure
   * Non-financial contribution options with descriptions and icons
   */
  const inKindOptions = [
    {
      title: "Food & Beverages",
      description: "Provide meals, snacks, or beverages for participants during the hackathon weekend.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Hardware & Equipment",
      description: "Donate or loan devices, hardware components, or specialized equipment for participants to use.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "Software & Services",
      description: "Provide access to professional software tools, cloud credits, or online services for participants.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      title: "Prizes & Swag",
      description: "Donate products, gift cards, or branded items to be given as prizes or included in participant swag bags.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    }
  ];

  return (
    <section id="sponsor" className="py-20 bg-[#16161A]" ref={ref}>
      <Container>
        {/* Section heading with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Sponsorship Options
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Partner with Hackabyte to support students in their tech journey while gaining visibility for your organization and connecting with emerging talent.
          </p>
        </motion.div>

        {/* Sponsorship tiers section with grid layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Sponsorship Tiers</h3>
          
          {/* Sponsorship tier cards in responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                className="bg-[#1A1A1E] rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300 h-full"
              >
                {/* Tier header with colored gradient background */}
                <div className={`p-6 bg-gradient-to-r ${tier.color} text-center`}>
                  <h4 className="text-2xl font-bold text-white mb-1">{tier.tier}</h4>
                  <p className="text-white text-lg font-medium">{tier.price}</p>
                </div>
                
                {/* Tier benefits list with checkmark icons */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 text-[#FF2247] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* In-kind sponsorship options section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">In-Kind Sponsorship Options</h3>
          
          {/* In-kind options cards in 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inKindOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                className="bg-[#1A1A1E] p-6 rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all flex items-start"
              >
                <div className="text-[#FF2247] mr-4 flex-shrink-0">
                  {option.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{option.title}</h4>
                  <p className="text-gray-300">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* "Why Partner With Us" section with contact information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800"
        >
          {/* Two-column layout with benefits and contact info */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left column - Benefits of sponsorship */}
            <div>
              <h3 className="text-2xl font-bold text-[#FF2247] mb-4">Why Partner With Us?</h3>
              
              {/* Partnership benefits with checkmark icons */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-300"><span className="font-bold text-white">Talent Discovery:</span> Connect with motivated students who could become future interns or employees</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-300"><span className="font-bold text-white">Brand Visibility:</span> Showcase your organization to a diverse audience of future tech professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-300"><span className="font-bold text-white">Community Impact:</span> Support STEM education and help build the next generation of tech innovators</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-300"><span className="font-bold text-white">Product Feedback:</span> Get fresh perspectives on your products or services from young users</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Contact information card */}
            <div className="bg-[#16161A] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-300 mb-6">
                Interested in becoming a sponsor? We'd love to discuss how we can create a partnership that aligns with your organization's goals and budget.
              </p>
              
              {/* Contact methods with icons */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF2247] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:teamhackabyte@gmail.com" className="text-gray-300 hover:text-[#FF2247] transition-colors">teamhackabyte@gmail.com</a>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF2247] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-[#FF2247] transition-colors">(555) 123-4567</a>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-[#FF2247] mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3864-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"></path>
                  </svg>
                  <a href="https://discord.gg/drXX4sZmbX" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#FF2247] transition-colors">Join our Discord community</a>
                </div>
              </div>
              
              {/* CTA button with hover animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6"
              >
                <Link href="/contact?subject=Sponsorship%20Inquiry" className="btn-primary w-full block text-center">
                  Request Sponsorship Info
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
