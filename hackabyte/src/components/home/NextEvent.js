import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import upcomingEvents from '../../data/upcomingEvents';

const NextEvent = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const nextEvent = upcomingEvents[0]; // Get the first upcoming event
  
  useEffect(() => {
    // Set target date for the countdown (placeholder - replace with actual event date)
    const targetDate = new Date('2025-03-29T08:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    // Update the countdown immediately, then set up interval
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="py-16 bg-hackabyte-dark border-t border-gray-800">
      <div className="container mx-auto px-4">
        <SectionTitle title="Next Event" />
        
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-hackabyte-gray rounded-lg p-4">
              <span className="block text-4xl font-bold text-hackabyte-red">{timeLeft.days.toString().padStart(2, '0')}</span>
              <span className="text-gray-400">Days</span>
            </div>
            <div className="bg-hackabyte-gray rounded-lg p-4">
              <span className="block text-4xl font-bold text-hackabyte-red">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-gray-400">Hours</span>
            </div>
            <div className="bg-hackabyte-gray rounded-lg p-4">
              <span className="block text-4xl font-bold text-hackabyte-red">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-gray-400">Minutes</span>
            </div>
            <div className="bg-hackabyte-gray rounded-lg p-4">
              <span className="block text-4xl font-bold text-hackabyte-red">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-gray-400">Seconds</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/events/sign-up" className="btn-primary text-lg">
            Sign up now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NextEvent;