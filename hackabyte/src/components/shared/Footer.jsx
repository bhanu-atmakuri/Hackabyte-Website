// hackabyte/src/components/shared/Footer.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from './Container';

export default function Footer() {
  // Use a stable value for the year to avoid hydration mismatch
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "About",
      links: [
        { name: "Our Mission", href: "/about#mission" },
        { name: "Our Team", href: "/about#team" },
        { name: "Join Us", href: "/join-us" },
        { name: "Contact", href: "/contact" },
        { name: "LUMA Program", href: "/luma" }
      ]
    },
    {
      title: "Events",
      links: [
        { name: "Upcoming Hackathons", href: "/events#upcoming" },
        { name: "Past Events", href: "/events/past-events" },
        { name: "Hackathon Details", href: "/events/hackathons" },
        { name: "Registration", href: "/events#registration" },
        { name: "Volunteer", href: "/join-us#volunteer" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Mentorship", href: "/join-us#mentor" },
        { name: "Sponsorship", href: "/join-us#sponsor" },
        { name: "Join Team", href: "/join-us#team" },
        { name: "Sign In", href: "/auth" },
        { name: "Age Groups", href: "/#age-groups" }
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "info@hackabyte.org", href: "mailto:info@hackabyte.org" },
        { name: "Support", href: "/contact" },
        { name: "Partner With Us", href: "/join-us#sponsor" },
        { name: "Sponsor an Event", href: "/join-us#sponsor" },
        { name: "Contact Form", href: "/contact" }
      ]
    }
  ];

  return (
    <footer className="bg-[#16161A] text-white">
      <Container className="py-8 xs:py-10 md:py-12">
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
          {/* Logo and info */}
          <div className="col-span-2 xs:col-span-2 sm:col-span-3 md:col-span-1 mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2 mb-4 xs:mb-6">
              <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                <div className="w-8 h-8 xs:w-10 xs:h-10 relative">
                  <img 
                    src="/logo.png" 
                    alt="Hackabyte Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              <span className="text-lg xs:text-xl font-bold">Hackabyte</span>
            </Link>
            
            <div className="text-sm xs:text-base text-gray-400 mb-4 xs:mb-6">
              Empowering young minds through coding challenges, teamwork, and innovation.
              Hackabyte provides hands-on hackathons for students of all ages.
            </div>
            
            <div className="flex space-x-5">
              <a 
                href="https://facebook.com/hackabyte" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#FF2247] transition-colors"
                style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a 
                href="https://twitter.com/hackabyte" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a 
                href="https://instagram.com/hackabyte" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/hackabyte" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links - Responsive grid layout */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4 text-gray-200">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-sm xs:text-base text-gray-400 hover:text-[#FF2247] transition-colors block py-1"
                      style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-[#131435] my-6 xs:my-8" />
        
        <div className="flex flex-col xs:flex-row justify-between items-center">
          <div className="text-gray-400 text-xs xs:text-sm mb-4 xs:mb-0 text-center xs:text-left">
            © {currentYear} Hackabyte. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center xs:justify-end gap-4 xs:gap-6">
            <Link 
              href="/contact" 
              className="text-gray-400 text-xs xs:text-sm hover:text-[#FF2247] transition-colors px-2 py-1"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-400 text-xs xs:text-sm hover:text-[#FF2247] transition-colors px-2 py-1"
            >
              Terms of Service
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-400 text-xs xs:text-sm hover:text-[#FF2247] transition-colors px-2 py-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
