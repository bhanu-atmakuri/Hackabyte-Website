import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (would connect to backend in a real implementation)
    console.log('Form data submitted:', formData);
    alert('Form submitted successfully!');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-hackabyte-gray border border-gray-700 rounded p-3 text-white"
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-hackabyte-gray border border-gray-700 rounded p-3 text-white"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2">Email <span className="text-hackabyte-red">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-hackabyte-gray border border-gray-700 rounded p-3 text-white"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          className="w-full bg-hackabyte-gray border border-gray-700 rounded p-3 text-white"
          required
        ></textarea>
      </div>
      
      <div className="text-center">
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;