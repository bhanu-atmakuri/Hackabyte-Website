import React from 'react';
import SectionTitle from '../common/SectionTitle';

const LumaAbout = () => {
  return (
    <div className="mb-20">
      <SectionTitle title="About Us" />
      
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-6">
          In 2024, Josh and Ekansh, the co-founders of Luma, established the Luma organization to allow young minds to 
          learn coding, irrespective of their skill level. Our aim is to empower every student to overcome limitations 
          through engaging coding classes. Classes that are creative, problem-solving as well as innovative. We believe 
          that every child should be educated in basic coding skills irrespective of his or her socio-economic 
          background or experience in the field.
        </p>
        
        <h3 className="text-2xl font-bold mb-4">What Do We Offer?</h3>
        <p className="text-lg mb-6">
          Luma provides a range of coding courses, that cater to different ages and skill levels ranging from beginner 
          levels to more advanced levels. Our interactive and engaging syllabus touches on various aspects from HTML 
          basics, all the way to Python programming languages, which enables students to express themselves freely.
        </p>
      </div>
    </div>
  );
};

export default LumaAbout;