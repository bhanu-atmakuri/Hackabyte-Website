'use client';

/**
 * Navbar Component
 * 
 * Displays the main navigation bar for the Hackabyte website with responsive design
 * supporting both desktop and mobile views. Features include:
 * - Responsive layout that adapts to different screen sizes
 * - Background changes on scroll for better visibility
 * - Dropdown menu for nested navigation items
 * - Mobile menu with animations and accessibility support
 * - Framer Motion animations for interactive elements
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function Navbar() {
  // State to track if the user has scrolled down the page
  const [isScrolled, setIsScrolled] = useState(false);
  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to track which dropdown menu is currently active
  const [activeDropdown, setActiveDropdown] = useState(null);
  // Reference to the dropdown menu for detecting outside clicks
  const dropdownRef = useRef(null);

  /**
   * Scroll effect handler
   * Applies background styling to navbar when user scrolls past threshold
   */
  useEffect(() => {
    const handleScroll = () => {
      // Apply scrolled styling when page is scrolled more than 10px
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add the event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check to set correct state on component mount
    handleScroll();
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this only runs once on mount

  /**
   * Outside click handler for dropdown menus
   * Closes dropdowns when clicking outside or pressing Escape/Tab keys
   * Improves accessibility and user experience
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown menu when clicking outside its container
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    // Handle keyboard events for accessibility
    const handleKeyDown = (e) => {
      // Close dropdown when Tab or Escape key is pressed
      if (e.key === 'Tab' || e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    // Add event listeners for mouse and keyboard interactions
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this only runs once

  /**
   * Navigation items data structure
   * Defines all navigation links, their URLs, and dropdown subitems where applicable
   */
  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { name: 'LUMA', href: '/luma', hasDropdown: false },
    { 
      name: 'Events', 
      href: '/events', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Hackathons', href: '/events/hackathons' },
        { name: 'Past Events', href: '/events/past-events' }
      ]
    },
    { name: 'About', href: '/about', hasDropdown: false },
    { name: 'Join Us', href: '/join-us', hasDropdown: false },
    { name: 'Contact Us', href: '/contact', hasDropdown: false },
  ];

  /**
   * Toggles dropdown menu visibility in mobile view
   * @param {number} index - Index of the dropdown menu to toggle
   */
  const handleDropdownToggle = (index) => {
    if (activeDropdown === index) {
      // Close the dropdown if it's already open
      setActiveDropdown(null);
    } else {
      // Open the clicked dropdown and close any others
      setActiveDropdown(index);
    }
  };

  return (
    <motion.nav
      // Animation for navbar entrance from top of screen
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        // Apply different styling based on scroll position
        isScrolled 
          ? 'bg-[#1A1A1E]/90 backdrop-blur-md shadow-md py-3' // Scrolled state
          : 'bg-transparent py-5' // Default state at top of page
      }`}
      style={{
        WebkitTransform: 'translate3d(0,0,0)',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      <Container>
        <div className="flex items-center justify-between w-full px-1 sm:px-0">
          {/* Site Logo and Branding */}
          <Link 
            href="/" 
            className="flex items-center space-x-1 sm:space-x-2 justify-start mr-auto safari-fix" 
            style={{
              display: '-webkit-box',
              display: 'flex',
              WebkitBoxAlign: 'center',
              WebkitBoxPack: 'start',
              WebkitAlignItems: 'center',
              alignItems: 'center'
            }}
          >
            <div 
              className="h-7 sm:h-9 md:h-10 lg:h-11 relative safari-logo-container" 
              style={{
                minWidth: '40px',
                width: '40px',
                display: 'block',
                WebkitFlexShrink: 0,
                flexShrink: 0
              }}
            >
              <img 
                src="/logo.png" 
                alt="Hackabyte Logo" 
                className="w-full h-full object-contain safari-logo-img"
                style={{
                  WebkitObjectFit: 'contain',
                  objectFit: 'contain'
                }}
              />
            </div>
            <span 
              className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-100 safari-text"
              style={{
                WebkitBoxFlex: '0',
                WebkitFlex: '0 0 auto',
                flex: '0 0 auto'
              }}
            >
              Hackabyte
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile screens */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <div key={item.name} 
                className={`relative ${item.hasDropdown ? 'group' : ''}`} 
                ref={item.hasDropdown && index === 2 ? dropdownRef : null}
              >
                {item.hasDropdown ? (
                  <>
                    <Link
                      href={item.href}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-white hover:text-[#FF2247] font-medium transition-colors flex items-center py-2 whitespace-nowrap safari-nav-item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-4 h-4 ml-1 transition-transform group-hover:rotate-180`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    
                    {/* Invisible spacer to maintain hover area for better UX */}
                    <div className="absolute h-2 w-full left-0 bottom-0 z-10"></div>
                    
                    {/* Dropdown Menu - Appears on hover */}
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 left-0 top-full w-48 rounded-md shadow-lg bg-[#16161A] border border-gray-800 ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200" style={{backdropFilter: 'blur(8px)'}}>
                      <div className="py-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 hover:bg-[#1A1A1E] hover:text-[#FF2247] whitespace-nowrap"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.href}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-white hover:text-[#FF2247] font-medium transition-colors whitespace-nowrap safari-nav-item"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth" className="text-sm sm:text-base md:text-lg lg:text-xl btn-primary whitespace-nowrap">
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle Button - Only visible on smaller screens */}
          <button 
            className="md:hidden text-gray-300 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
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

        {/* Mobile Menu - Animated dropdown with nested navigation items */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-[#1A1A1E] shadow-lg rounded-b-md overflow-hidden"
            >
              <motion.div 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-0 py-2 sm:py-4"
              >
                {navItems.map((item, index) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            className="text-sm sm:text-base md:text-lg lg:text-xl text-white hover:text-[#FF2247] font-medium transition-colors px-4 py-2 sm:py-3 flex-grow text-left whitespace-nowrap"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDropdownToggle(index);
                            }}
                            className="px-4 py-2 sm:py-3"
                            aria-label={`Toggle ${item.name} dropdown`}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''} text-white`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 1 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="pl-6 bg-[#1A1A1E] border-l-2 border-[#F93236]/30 ml-4 shadow-lg rounded-b-md overflow-hidden"
                            >
                              <motion.div
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                exit={{ y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.dropdownItems.map((dropdownItem) => (
                                  <Link 
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block py-1 sm:py-2 px-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 hover:text-[#FF2247] whitespace-nowrap"
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setIsMobileMenuOpen(false);
                                    }}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link 
                        href={item.href}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white hover:text-[#FF2247] font-medium transition-colors px-4 py-2 sm:py-3 block whitespace-nowrap"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link 
                  href="/auth" 
                  className="text-sm sm:text-base md:text-lg lg:text-xl btn-primary mx-4 mt-4 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.nav>
  );
}
