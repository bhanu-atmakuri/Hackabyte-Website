'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function SponsorshipOptions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

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
      color: "from-[#F93236] to-[#FF2247]",
      glow: true
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

  const inKindOptions = [
    {
      title: "Food & Beverages",
      description: "Provide meals, snacks, or beverages for participants during the hackathon weekend.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Hardware & Equipment",
      description: "Donate or loan devices, hardware components, or specialized equipment for participants to use.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "Software & Services",
      description: "Provide access to professional software tools, cloud credits, or online services for participants.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      title: "Prizes & Swag",
      description: "Donate products, gift cards, or branded items to be given as prizes or included in participant swag bags.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    }
  ];

  return (
    <section id="sponsor" className="py-24 md:py-32 bg-[#0E0E11] relative" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Partner With Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Sponsorship <span className="heading-gradient">Options</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Partner with Hackabyte to support students in their tech journey while gaining visibility for your organization and connecting with emerging talent.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xl font-black tracking-tight text-white mb-8 text-center">Sponsorship Tiers</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                className={`card-glass rounded-xl overflow-hidden h-full ${tier.glow ? 'glow-red' : ''}`}
              >
                <div className={`p-5 bg-gradient-to-r ${tier.color} text-center`}>
                  <h4 className="text-xl font-black tracking-tight text-white">{tier.tier}</h4>
                  <p className="text-white/80 text-sm font-bold">{tier.price}</p>
                </div>

                <div className="p-5">
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-4 w-4 text-[#FF2247] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl font-black tracking-tight text-white mb-8 text-center">In-Kind Sponsorship Options</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inKindOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                className="card-glass rounded-xl p-6 flex items-start hover:border-white/[0.12] transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded-lg text-[#FF2247] mr-4">
                  {option.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold tracking-tight text-white mb-1">{option.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="card-glass rounded-xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-black tracking-tight text-white mb-4">Why Partner With <span className="heading-gradient">Us?</span></h3>

              <div className="space-y-3">
                {[
                  { bold: "Talent Discovery:", text: "Connect with motivated students who could become future interns or employees" },
                  { bold: "Brand Visibility:", text: "Showcase your organization to a diverse audience of future tech professionals" },
                  { bold: "Community Impact:", text: "Support STEM education and help build the next generation of tech innovators" },
                  { bold: "Product Feedback:", text: "Get fresh perspectives on your products or services from young users" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded">
                      <svg className="h-3 w-3 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-400 text-sm"><span className="font-bold text-white">{item.bold}</span> {item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glass-strong rounded-xl p-6">
              <h3 className="text-lg font-bold tracking-tight text-white mb-4">Get In Touch</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Interested in becoming a sponsor? We'd love to discuss how we can create a partnership that aligns with your organization's goals and budget.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded text-[#FF2247] mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:teamhackabyte@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm">teamhackabyte@gmail.com</a>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded text-[#FF2247] mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors text-sm">(555) 123-4567</a>
                </div>
              </div>

              <Link href="/contact?subject=Sponsorship%20Inquiry" className="btn-primary w-full block text-center">
                Request Sponsorship Info
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
