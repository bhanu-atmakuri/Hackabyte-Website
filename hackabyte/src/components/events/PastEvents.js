import React from 'react';
import { Link } from 'react-router-dom';
import pastEvents from '../../data/pastEvents';

const PastEvents = () => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12">
      {pastEvents.map((event) => (
        <div key={event.id} className="bg-hackabyte-gray rounded-lg overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mb-4">
              <div className="text-gray-300">
                <strong>Date:</strong> {event.date}
              </div>
              <div className="text-gray-300">
                <strong>Theme:</strong> {event.theme}
              </div>
            </div>
            
            <p className="mb-6 text-gray-300 line-clamp-3">
              {event.description}
            </p>
            
            <Link to={`/events/past-events/${event.id}`} className="btn-primary">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastEvents;