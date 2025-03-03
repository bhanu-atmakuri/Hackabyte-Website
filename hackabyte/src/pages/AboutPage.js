import React from 'react';
import AboutHero from '../components/about/AboutHero';
import BoardMembers from '../components/about/BoardMembers';
import VolunteerLeads from '../components/about/VolunteerLeads';

const AboutPage = () => {
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <AboutHero />
        
        {/* Board Members Section */}
        <BoardMembers />
        
        {/* Volunteer Leads Section */}
        <VolunteerLeads />
      </div>
    </div>
  );
};

export default AboutPage;