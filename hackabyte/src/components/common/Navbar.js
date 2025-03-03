import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEventsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (eventsDropdownOpen) setEventsDropdownOpen(false);
  };

  const toggleEventsDropdown = () => {
    setEventsDropdownOpen(!eventsDropdownOpen);
  };

  return (
    <nav className="bg-hackabyte-dark py-4 px-4 md:px-8 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Hackabyte Logo" 
            className="h-10"
          />
          <span className="ml-2 text-2xl font-bold">Hackabyte</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" className={({ isActive }) => 
            isActive ? "text-hackabyte-red" : "nav-link"}>
            Home
          </NavLink>
          
          <NavLink to="/luma" className={({ isActive }) => 
            isActive ? "text-hackabyte-red" : "nav-link"}>
            LUMA
          </NavLink>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              className={`flex items-center nav-link ${window.location.pathname.includes("/events") ? "text-hackabyte-red" : ""}`}
              onClick={toggleEventsDropdown}
            >
              Events
              <svg 
                className={`ml-1 w-4 h-4 transition-transform ${eventsDropdownOpen ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {eventsDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-hackabyte-gray rounded shadow-lg py-2 z-10">
                <NavLink 
                  to="/events/hackathons" 
                  className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
                  onClick={() => setEventsDropdownOpen(false)}
                >
                  Hackathons
                </NavLink>
                <NavLink 
                  to="/events/past-events" 
                  className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
                  onClick={() => setEventsDropdownOpen(false)}
                >
                  Past Events
                </NavLink>
              </div>
            )}
          </div>
          
          <NavLink to="/about" className={({ isActive }) => 
            isActive ? "text-hackabyte-red" : "nav-link"}>
            About
          </NavLink>
          
          <NavLink to="/join-us" className={({ isActive }) => 
            isActive ? "text-hackabyte-red" : "nav-link"}>
            Join Us
          </NavLink>
          
          <NavLink to="/contact" className={({ isActive }) => 
            isActive ? "text-hackabyte-red" : "nav-link"}>
            Contact Us
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-hackabyte-gray rounded-lg py-2">
          <NavLink 
            to="/" 
            className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
            onClick={toggleMobileMenu}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/luma" 
            className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
            onClick={toggleMobileMenu}
          >
            LUMA
          </NavLink>
          
          <button 
            className="w-full text-left px-4 py-2 hover:bg-black hover:text-hackabyte-red flex items-center justify-between"
            onClick={toggleEventsDropdown}
          >
            Events
            <svg 
              className={`ml-1 w-4 h-4 transition-transform ${eventsDropdownOpen ? "rotate-180" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {eventsDropdownOpen && (
            <div className="pl-8 bg-hackabyte-dark">
              <NavLink 
                to="/events/hackathons" 
                className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
                onClick={toggleMobileMenu}
              >
                Hackathons
              </NavLink>
              <NavLink 
                to="/events/past-events" 
                className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
                onClick={toggleMobileMenu}
              >
                Past Events
              </NavLink>
            </div>
          )}
          
          <NavLink 
            to="/about" 
            className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
            onClick={toggleMobileMenu}
          >
            About
          </NavLink>
          
          <NavLink 
            to="/join-us" 
            className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
            onClick={toggleMobileMenu}
          >
            Join Us
          </NavLink>
          
          <NavLink 
            to="/contact" 
            className="block px-4 py-2 hover:bg-black hover:text-hackabyte-red"
            onClick={toggleMobileMenu}
          >
            Contact Us
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;