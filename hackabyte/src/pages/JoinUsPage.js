import React from 'react';
import JoinHero from '../components/join/JoinHero';
import VolunteerForm from '../components/join/VolunteerForm';

const JoinUsPage = () => {
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        {/* Join Us Hero */}
        <JoinHero />
        
        {/* Volunteer Form */}
        <VolunteerForm />
        
        {/* Footer Separator */}
        <div className="border-t border-gray-800 my-16 max-w-xl mx-auto"></div>
      </div>
    </div>
  );
};

export default JoinUsPage;