import React from 'react';

const LumaHero = () => {
  return (
    <div className="mb-20 text-center">
      <div className="relative inline-block mb-8">
        <div 
          className="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center mx-auto"
        >
          <span className="text-white text-5xl">&lt;/&gt;</span>
        </div>
        <h2 className="text-5xl font-bold mt-4">Luma</h2>
      </div>
      
      <p className="text-xl max-w-3xl mx-auto">
        Luma is a subsidiary of Hackabyte, dedicated to raising inclusivity for software education
      </p>
      
      <div className="mt-8">
        <a 
          href="https://classes.luma.org"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-3 px-8 text-lg"
        >
          JOIN OUR CLASSES!
        </a>
      </div>
    </div>
  );
};

export default LumaHero;