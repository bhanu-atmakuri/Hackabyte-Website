import React from 'react';
import SectionTitle from '../common/SectionTitle';
import upcomingEvents from '../../data/upcomingEvents';

const HackathonSchedule = () => {
  // Get the upcoming Spring Hackathon from data
  const springHackathon = upcomingEvents.find(event => event.id === 'spring-2025');
  
  if (!springHackathon) {
    return null;
  }
  
  return (
    <div className="mb-16">
      <SectionTitle title={`Our ${springHackathon.title} will be on ${springHackathon.date}, Saturday and Sunday at ${springHackathon.location}.`} subtitle="" />
      
      {/* Schedule Section */}
      <div className="mb-16">
        <SectionTitle title="2024 Summer Hackathon Schedule:" subtitle="" />
        
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-black bg-opacity-70 p-6 text-center">
              <h3 className="text-4xl font-bold mb-8">Schedule</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Saturday Schedule */}
                <div>
                  <h4 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">Saturday</h4>
                  
                  <div className="space-y-4">
                    {springHackathon.schedule.saturday.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="w-16 text-hackabyte-red font-bold text-xl text-right pr-4">{item.time.split(' ')[0]}</div>
                        <div className="flex-1 pl-4 border-l border-gray-700">
                          <div className="text-lg">{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sunday Schedule */}
                <div>
                  <h4 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">Sunday</h4>
                  
                  <div className="space-y-4">
                    {springHackathon.schedule.sunday.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="w-16 text-hackabyte-red font-bold text-xl text-right pr-4">{item.time.split(' ')[0]}</div>
                        <div className="flex-1 pl-4 border-l border-gray-700">
                          <div className="text-lg">{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonSchedule;