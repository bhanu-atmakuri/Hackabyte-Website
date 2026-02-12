'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addEvent } from '@/lib/firebase/events';
import { uploadEventThumbnail } from '@/lib/firebase/storage';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';
import Link from 'next/link';
import { motion } from 'framer-motion';

function parseEventDate(value) {
  if (!value) return null;

  const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const month = Number(dateOnlyMatch[2]);
    const day = Number(dateOnlyMatch[3]);
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export default function NewEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    state: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    eventType: 'Hackathon',
    showOnPastEventsPage: false,
    image: '',
    ageGroups: {
      'middle school': false,
      'high school': false,
      'college': false
    },
    competitionLevel: '',
    requirements: ''
  });
  
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

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type?.startsWith('image/')) {
      setError('Please upload a valid image file for the thumbnail.');
      return;
    }

    setIsUploadingImage(true);
    setError(null);

    try {
      const uploadedImageUrl = await uploadEventThumbnail(file);
      setFormData(prev => ({
        ...prev,
        image: uploadedImageUrl
      }));
    } catch (uploadError) {
      console.error('Error uploading thumbnail:', uploadError);
      setError('Failed to upload thumbnail. Please try again.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const endDate = parseEventDate(formData.endDate);
  const today = new Date();
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const eventEndDateOnly = endDate
    ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    : null;
  const isAutomaticallyPassed = Boolean(eventEndDateOnly && todayDateOnly > eventEndDateOnly);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addEvent(formData);
      router.push('/admin/events');
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to add event. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Create New Event</h1>
        <p className="text-gray-400">Add a new hackathon or competition event</p>
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
          
          {/* Past events page visibility */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showOnPastEventsPage"
              name="showOnPastEventsPage"
              checked={formData.showOnPastEventsPage}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-700 text-[#FF2247] focus:ring-[#FF2247] bg-[#1A1A1E]"
            />
            <label htmlFor="showOnPastEventsPage" className="ml-2 block text-sm text-gray-300">
              Show on Past Events page
            </label>
          </div>

          {/* Auto passed status info */}
          <div className="flex items-center text-sm text-gray-400">
            {formData.endDate ? (
              <span>{isAutomaticallyPassed ? 'Status: Past (auto by end date)' : 'Status: Upcoming (auto by end date)'}</span>
            ) : (
              <span>Status is set automatically once an end date is selected.</span>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="col-span-full">
            <label htmlFor="thumbnailUpload" className="block text-sm font-medium mb-2 text-gray-300">
              Event Thumbnail
            </label>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-start">
              <div
                className="h-36 rounded-md border border-gray-700 bg-[#1A1A1E] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${resolveImageSrc(formData.image, PLACEHOLDER_IMAGES.event)})`
                }}
              />
              <div className="space-y-3">
                <input
                  type="file"
                  id="thumbnailUpload"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="w-full px-3 py-2 text-sm bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#FF2247] file:text-white hover:file:bg-[#E01F3F]"
                />
                {isUploadingImage && (
                  <p className="text-xs text-gray-400">Uploading thumbnail...</p>
                )}
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Or paste a thumbnail URL"
                  className="w-full px-3 py-2 text-sm bg-[#1A1A1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF2247] focus:border-[#FF2247] text-white"
                />
              </div>
            </div>
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
            disabled={isSubmitting || isUploadingImage}
            className="btn-primary disabled:opacity-50 disabled:hover:bg-[#FF2247]"
            whileHover={{ scale: isSubmitting || isUploadingImage ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitting || isUploadingImage ? 1 : 0.97 }}
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
