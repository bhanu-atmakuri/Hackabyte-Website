import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import SocialIcons from '../components/common/SocialIcons';
import ContactForm from '../components/contact/ContactForm';

const ContactPage = () => {
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch gap-12">
          {/* Contact Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <SectionTitle title="Contact Us" centered={false} />
            
            <div className="mb-8">
              <SocialIcons />
            </div>
            
            <p className="text-lg mb-4">
              teamhackabyte@gmail.com
            </p>
          </div>
          
          {/* Contact Form */}
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;