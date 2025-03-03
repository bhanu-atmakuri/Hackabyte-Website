import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-particles.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-hackabyte-dark/80"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to <span className="text-hackabyte-red">Hackabyte</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Inspiring Innovation, Shaping Tomorrow
        </p>
        <Link to="/events" className="btn-primary text-lg py-3 px-8">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Hero;