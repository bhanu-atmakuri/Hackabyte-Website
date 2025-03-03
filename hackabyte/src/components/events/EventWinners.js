import React from 'react';
import SectionTitle from '../common/SectionTitle';

const EventWinners = ({ winners, honorableMentions }) => {
  if (!winners || winners.length === 0) return null;

  return (
    <div className="mb-16">
      <SectionTitle title="Event Winners!" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 1st Place */}
        {winners.find(w => w.place === '1st') && (
          <div className="bg-hackabyte-gray rounded-lg overflow-hidden border-2 border-yellow-500">
            <div className="bg-yellow-500 py-3 px-4 text-center">
              <h3 className="text-2xl font-bold text-black">1st Place</h3>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2">
                {winners.find(w => w.place === '1st').team}
              </h4>
              <p className="text-gray-300 mb-3">
                {winners.find(w => w.place === '1st').members}
              </p>
              <div className="mb-3">
                <strong>Project Name:</strong> {winners.find(w => w.place === '1st').project}
              </div>
              {winners.find(w => w.place === '1st').projectLink && (
                <div>
                  <strong>Project Link:</strong>{' '}
                  <a 
                    href={winners.find(w => w.place === '1st').projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Link
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 2nd Place */}
        {winners.find(w => w.place === '2nd') && (
          <div className="bg-hackabyte-gray rounded-lg overflow-hidden border-2 border-gray-400">
            <div className="bg-gray-400 py-3 px-4 text-center">
              <h3 className="text-2xl font-bold text-black">2nd Place</h3>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2">
                {winners.find(w => w.place === '2nd').team}
              </h4>
              <p className="text-gray-300 mb-3">
                {winners.find(w => w.place === '2nd').members}
              </p>
              <div className="mb-3">
                <strong>Project Name:</strong> {winners.find(w => w.place === '2nd').project}
              </div>
              {winners.find(w => w.place === '2nd').projectLink && (
                <div>
                  <strong>Project Link:</strong>{' '}
                  <a 
                    href={winners.find(w => w.place === '2nd').projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Link
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 3rd Place */}
        {winners.find(w => w.place === '3rd') && (
          <div className="bg-hackabyte-gray rounded-lg overflow-hidden border-2 border-amber-700">
            <div className="bg-amber-700 py-3 px-4 text-center">
              <h3 className="text-2xl font-bold text-white">3rd Place</h3>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2">
                {winners.find(w => w.place === '3rd').team}
              </h4>
              <p className="text-gray-300 mb-3">
                {winners.find(w => w.place === '3rd').members}
              </p>
              <div className="mb-3">
                <strong>Project Name:</strong> {winners.find(w => w.place === '3rd').project}
              </div>
              {winners.find(w => w.place === '3rd').projectLink && (
                <div>
                  <strong>Project Link:</strong>{' '}
                  <a 
                    href={winners.find(w => w.place === '3rd').projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Link
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Honorable Mentions */}
      {honorableMentions && honorableMentions.length > 0 && (
        <div className="mt-16">
          <SectionTitle title="Honorable Mentions" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {honorableMentions.map((mention, index) => (
              <div key={index} className="bg-hackabyte-gray rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2">{mention.team}</h4>
                {mention.members && (
                  <div className="mb-3">
                    <strong>Members:</strong> {mention.members}
                  </div>
                )}
                {mention.project && (
                  <div className="mb-3">
                    <strong>Project Name:</strong> {mention.project}
                  </div>
                )}
                {mention.projectLink && (
                  <div>
                    <strong>Project Link:</strong>{' '}
                    <a 
                      href={mention.projectLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Link
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventWinners;