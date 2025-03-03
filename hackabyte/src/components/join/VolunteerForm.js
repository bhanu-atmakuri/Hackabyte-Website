import React from 'react';
import SectionTitle from '../common/SectionTitle';

const VolunteerForm = () => {
  return (
    <div className="max-w-xl mx-auto">
      {/* Volunteer Sign Up Button */}
      <div className="text-center mb-12">
        <a 
          href="https://forms.gle/yourVolunteerFormLink" 
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-3 px-12 text-lg inline-block"
        >
          Volunteer Sign Up
        </a>
      </div>
      
      {/* Judges/Mentors */}
      <div className="text-center mb-16">
        <h3 className="text-2xl font-bold mb-4">Judges/Mentors:</h3>
        <p className="text-lg mb-6">
          Contact us through any platforms on the contact us page and let us know if 
          you want to judge! (email is recommended).
        </p>
      </div>
    </div>
  );
};

export default VolunteerForm;