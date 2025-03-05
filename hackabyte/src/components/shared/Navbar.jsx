'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'LUMA', href: '/luma' },
    { 
      name: 'Events', 
      href: '/events',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Hackathons', href: '/events/hackathons' },
        { name: 'Past Events', href: '/events/past-events' }
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Join Us', href: '/join-us' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1A1A1E]/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo in Center for larger screens, Left for mobile */}
          <div className="flex-1 flex items-center md:justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 relative">
                <img 
                  src="/logo.png" 
                  alt="Hackabyte Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-100">Hackabyte</span>
            </Link>
          </div>

          {/* Desktop Navigation (right-aligned) */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div>
                    <button className="text-white hover:text-[#FF2247] font-medium transition-colors flex items-center py-2">
                      {item.name}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 left-0 top-full w-48 rounded-md shadow-lg bg-[#16161A] border border-gray-800 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200">
                      <div className="py-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1A1A1E] hover:text-[#FF2247]"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-white hover:text-[#FF2247] font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/auth" className="bg-[#F93236] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#FF003C] transition-all duration-300">
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-0 py-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          className="text-white hover:text-[#FF2247] font-medium transition-colors px-4 py-3 w-full text-left flex items-center justify-between"
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        >
                          {item.name}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && item.dropdownItems && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-6 bg-[#1A1A1E]/50 border-l-2 border-[#F93236]/30 ml-4"
                            >
                              {item.dropdownItems.map((dropdownItem) => (
                                <Link 
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className="block py-2 px-4 text-gray-300 hover:text-[#FF2247]"
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link 
                        href={item.href}
                        className="text-white hover:text-[#FF2247] font-medium transition-colors px-4 py-3 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link 
                  href="/auth" 
                  className="bg-[#F93236] text-white font-semibold py-2 px-4 mx-4 mt-4 rounded-lg text-center block hover:bg-[#FF003C] transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}