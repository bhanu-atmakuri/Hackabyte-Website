import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import EventDetail from '../components/events/EventDetail';
import EventWinners from '../components/events/EventWinners';
import Sponsors from '../components/events/Sponsors';
import pastEvents from '../data/pastEvents';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  
  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = pastEvents.find(e => e.id === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // If no event is found, redirect to the past events page
      navigate('/events/past-events');
    }
  }, [eventId, navigate]);
  
  // Show loading state while fetching event
  if (!event) {
    return (
      <div className="py-16 bg-hackabyte-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading event details...</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Event Details */}
          <EventDetail event={event} />
          
          {/* Winners Section */}
          {event.winners && (
            <EventWinners winners={event.winners} honorableMentions={event.honorableMentions} />
          )}
          
          {/* Judges Section */}
          {event.judges && event.judges.length > 0 && (
            <div className="mb-16">
              <SectionTitle title="Our Judges." subtitle="Dedication. Expertise. Passion." />
              
              <div className="text-center mb-8">
                <p className="text-lg">
                  Our event would not be possible without our judges. Thank you to all our judges who volunteered!
                </p>
              </div>
            </div>
          )}
          
          {/* Event Pictures */}
          {event.eventPictures && event.eventPictures.length > 0 && (
            <div className="mb-16">
              <SectionTitle title="Event Pictures" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {event.eventPictures.map((picture, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={picture} 
                      alt={`Event picture ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Sponsors Section */}
          {event.sponsors && (
            <Sponsors sponsors={event.sponsors} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;