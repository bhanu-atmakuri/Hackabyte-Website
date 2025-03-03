import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import LumaHero from '../components/luma/LumaHero';
import LumaAbout from '../components/luma/LumaAbout';
import TeamLuma from '../components/luma/TeamLuma';

const LumaPage = () => {
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        {/* LUMA Hero */}
        <LumaHero />
        
        {/* About LUMA */}
        <LumaAbout />
        
        {/* Join LUMA */}
        <div className="mb-20">
          <SectionTitle title="Join us Today!" />
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg mb-6">
              Luma is looking for volunteers! Apart from being a school that offers training in programming languages, we 
              are a strong community where learners come together with trainers and guides so they can thrive in what 
              they do. Our team of experienced professionals is committed to helping kids reach their full potential 
              academically through teaching; thus fostering an atmosphere that promotes group work among peers.
            </p>
          </div>
          
          <div className="text-center mb-16">
            <a 
              href="https://forms.gle/joinLumaVolunteer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-3 px-12 text-lg"
            >
              APPLY NOW!
            </a>
          </div>
          
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-lg">
              Join Team Luma now and make a difference! Apply today and become a part 
              of our community of passionate individuals who are dedicated to making 
              positive impact. Don't miss out on this opportunity be a part of something.
            </p>
          </div>
          
          <div className="text-center">
            <a 
              href="https://forms.gle/joinLuma"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white py-3 px-12 rounded-full font-medium hover:bg-green-600 transition-colors text-lg"
            >
              JOIN!
            </a>
          </div>
        </div>
        
        {/* Team LUMA */}
        <TeamLuma />
      </div>
    </div>
  );
};

export default LumaPage;