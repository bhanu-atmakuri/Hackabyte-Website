import React from 'react';

const EventDetail = ({ event }) => {
  if (!event) return null;

  return (
    <div className="mb-12 space-y-6">
      {/* Event Banner */}
      <div className="mb-8 relative">
        <div className="aspect-video rounded-lg overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-6">
            <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
          </div>
        </div>
      </div>
      
      {/* Event Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-hackabyte-gray rounded-lg p-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Date:</h3>
          <p>{event.date}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Location:</h3>
          <p>{event.location}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Participants:</h3>
          <p>{event.participants}</p>
        </div>
      </div>
      
      <div className="bg-hackabyte-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Theme:</h3>
        <p className="text-lg">{event.theme}</p>
      </div>
      
      <div className="bg-hackabyte-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Description:</h3>
        <p className="text-lg whitespace-pre-line">{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetail;