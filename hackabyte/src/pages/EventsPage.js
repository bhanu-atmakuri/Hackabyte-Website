import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import EventTypes from '../components/events/EventTypes';
import EventsList from '../components/events/EventsList';

const EventsPage = () => {
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        <SectionTitle title="Tech for Everyone." />
        
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="text-xl mb-8">
            Start a venture into innovation, collaboration, and skill enhancement. Not only do you stand 
            a chance to secure incredible prizes, but you'll also acquire valuable experience and 
            broaden your network within the tech industry.
          </p>
          
          <Link to="/events/sign-up" className="btn-primary py-3 px-8 text-lg">
            Sign Up For Upcoming Events
          </Link>
        </div>
        
        {/* Event Types */}
        <EventTypes />
        
        {/* Upcoming Events */}
        <EventsList />
      </div>
    </div>
  );
};

export default EventsPage;