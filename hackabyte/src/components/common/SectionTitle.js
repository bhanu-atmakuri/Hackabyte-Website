import React from 'react';

const SectionTitle = ({ title, subtitle, centered = true, underline = true }) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-4xl md:text-5xl font-bold text-hackabyte-red ${underline ? 'section-underline' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-gray-300 ${centered ? 'max-w-3xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;