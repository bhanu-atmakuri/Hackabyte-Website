'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEvent, updateEvent } from '@/lib/firebase/events';
import Link from 'next/link';
import useNoFlash from '@/lib/hooks/useNoFlash';
import { motion } from 'framer-motion';

export default function EditEventPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Prevent flash during hydration
  useNoFlash();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    state: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    eventType: '',
    hasPassed: false,
    ageGroups: {
      'middle school': false,
      'high school': false,
      'college': false
    },
    competitionLevel: '',
    requirements: ''
  });
  
  useEffect(() => {
    if (!isMounted) return;
    
    async function fetchEvent() {
      try {
        const eventData = await getEvent(id);
        
        // Initialize ageGroups object if it doesn't exist
        if (!eventData.ageGroups) {
          eventData.ageGroups = {
            'middle school': false,
            'high school': false,
            'college': false
          };
        }
        
        setFormData(eventData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event data. Please try again.');
        setIsLoading(false);
      }
    }
    
    fetchEvent();
  }, [id, isMounted]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('ageGroups.')) {
      const ageGroup = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ageGroups: {
          ...prev.ageGroups,
          [ageGroup]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updateEvent(id, formData);
      router.push('/admin/events');
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Failed to update event. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>;
  }
  
  if (isLoading) {
    return (
      <div className="py-10 px-4 max-w-4xl mx-auto flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF2247]"></div>
      </div>
    );
  }
  
  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Edit Event</h1>
        <p className="text-gray-400">Update event details</p>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-[#16161A] rounded-lg p-6 shadow-lg border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div className="col-span-full">
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
              Event Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            />
          </div>
          
          {/* Event Type */}
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium mb-1 text-gray-300">
              Event Type*
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            >
              <option value="Hackathon">Hackathon</option>
              <option value="Workshop">Workshop</option>
              <option value="Competition">Competition</option>
              <option value="Conference">Conference</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          {/* Competition Level */}
          <div>
            <label htmlFor="competitionLevel" className="block text-sm font-medium mb-1 text-gray-300">
              Competition Level*
            </label>
            <select
              id="competitionLevel"
              name="competitionLevel"
              value={formData.competitionLevel}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            >
              <option value="">Select a level</option>
              <option value="Local">Local</option>
              <option value="Regional">Regional</option>
              <option value="State">State</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1 text-gray-300">
              Location Address*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            />
          </div>
          
          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1 text-gray-300">
              State*
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            />
          </div>
          
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1 text-gray-300">
              Start Date*
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            />
          </div>
          
          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1 text-gray-300">
              End Date*
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            />
          </div>
          
          {/* Registration Deadline */}
          <div>
            <label htmlFor="registrationDeadline" className="block text-sm font-medium mb-1 text-gray-300">
              Registration Deadline*
            </label>
            <input
              type="date"
              id="registrationDeadline"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            />
          </div>
          
          {/* Has Passed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasPassed"
              name="hasPassed"
              checked={formData.hasPassed}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-700 text-[#FF2247] focus:ring-[#FF2247] bg-[#1A1A1E]"
            />
            <label htmlFor="hasPassed" className="ml-2 block text-sm text-gray-300">
              Event has already passed
            </label>
          </div>
          
          {/* Age Groups */}
          <div className="col-span-full">
            <span className="block text-sm font-medium mb-2 text-gray-300">Age Groups*</span>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ageGroup-middle"
                  name="ageGroups.middle school"
                  checked={formData.ageGroups['middle school']}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 text-[#FF2247] focus:ring-[#FF2247] bg-[#1A1A1E]"
                />
                <label htmlFor="ageGroup-middle" className="ml-2 block text-sm text-gray-300">
                  Middle School
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ageGroup-high"
                  name="ageGroups.high school"
                  checked={formData.ageGroups['high school']}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 text-[#FF2247] focus:ring-[#FF2247] bg-[#1A1A1E]"
                />
                <label htmlFor="ageGroup-high" className="ml-2 block text-sm text-gray-300">
                  High School
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ageGroup-college"
                  name="ageGroups.college"
                  checked={formData.ageGroups['college']}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 text-[#FF2247] focus:ring-[#FF2247] bg-[#1A1A1E]"
                />
                <label htmlFor="ageGroup-college" className="ml-2 block text-sm text-gray-300">
                  College
                </label>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-300">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            ></textarea>
          </div>
          
          {/* Requirements */}
          <div className="col-span-full">
            <label htmlFor="requirements" className="block text-sm font-medium mb-1 text-gray-300">
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows="4"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/events"
            className="btn-secondary"
          >
            Cancel
          </Link>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:hover:bg-[#FF2247]"
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
