/**
 * Event Management Component for Admin Dashboard
 * 
 * Provides admin functionality for:
 * - Viewing all events
 * - Creating new events
 * - Editing existing events
 * - Viewing event registrations
 * - Deleting events
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [viewRegistrations, setViewRegistrations] = useState(null);
  
  const formRef = useRef(null);
  
  // Initial form state for create/edit
  const initialFormState = {
    name: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    status: 'upcoming',
    maximumParticipants: '',
    registrationDeadline: '',
    discordLink: '',
    theme: '',
  };
  
  const [formData, setFormData] = useState(initialFormState);
  
  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);
  
  // Fetch all events
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/admin/events');
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.events);
      } else {
        toast.error('Failed to load events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Error loading events');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Load event data into form for editing
  const handleEditStart = (event) => {
    setFormData({
      name: event.name,
      description: event.description,
      location: event.location,
      startDate: new Date(event.startDate).toISOString().split('T')[0],
      endDate: new Date(event.endDate).toISOString().split('T')[0],
      status: event.status,
      maximumParticipants: event.maximumParticipants || '',
      registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().split('T')[0] : '',
      discordLink: event.discordLink || '',
      theme: event.theme || '',
    });
    
    setEditingEvent(event._id);
    setIsCreating(false);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission for create/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (editingEvent) {
        // Update event
        response = await fetch('/api/admin/events', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: editingEvent,
            ...formData
          }),
        });
      } else {
        // Create new event
        response = await fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(editingEvent ? 'Event updated successfully' : 'Event created successfully');
        
        // Refresh events list
        fetchEvents();
        
        // Reset form
        setFormData(initialFormState);
        setEditingEvent(null);
        setIsCreating(false);
      } else {
        throw new Error(result.message || 'Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error(error.message || 'Error saving event');
    }
  };
  
  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/admin/events?eventId=${eventId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove event from local state
        setEvents(events.filter(event => event._id !== eventId));
        
        toast.success('Event deleted successfully');
        setShowConfirmDelete(null);
      } else {
        throw new Error(data.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.message || 'Error deleting event');
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (isLoading) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-700 rounded w-full mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // If viewing registrations for a specific event
  if (viewRegistrations) {
    const event = events.find(e => e._id === viewRegistrations);
    
    if (!event) {
      return <div className="text-white">Event not found</div>;
    }
    
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Registrations for {event.name}</h2>
            <button 
              onClick={() => setViewRegistrations(null)}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Back to Events
            </button>
          </div>
          
          <div className="mb-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1A1A1E] p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Event Date</p>
                <p className="text-white">{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
              </div>
              <div className="bg-[#1A1A1E] p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white">{event.location}</p>
              </div>
              <div className="bg-[#1A1A1E] p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  event.status === 'upcoming' 
                    ? 'bg-blue-900 text-blue-200' 
                    : event.status === 'ongoing'
                      ? 'bg-green-900 text-green-200'
                      : 'bg-gray-900 text-gray-200'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          </div>
          
          {event.registrationCount > 0 ? (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{event.registrationCount} Registrations</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-[#1A1A1E]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Participant
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Team Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Experience
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        School
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Registration Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#16161A] divide-y divide-gray-800">
                    {event.registrations && event.registrations.map((registration) => (
                      <tr key={registration._id} className="hover:bg-[#1A1A1E]">
                        <td className="px-6 py-4">
                          <div className="text-sm text-white">{registration.user.name}</div>
                          <div className="text-xs text-gray-400">{registration.user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {registration.hasTeam ? (
                            <div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
                                Team
                              </span>
                              <div className="text-xs text-gray-400 mt-1">
                                {registration.teamSize} members
                                {registration.teamName && <span> • {registration.teamName}</span>}
                              </div>
                            </div>
                          ) : registration.needsTeam ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-200">
                              Needs Team
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                              Individual
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            registration.experience === 'Beginner' 
                              ? 'bg-blue-900 text-blue-200' 
                              : registration.experience === 'Intermediate'
                                ? 'bg-yellow-900 text-yellow-200'
                                : 'bg-purple-900 text-purple-200'
                          }`}>
                            {registration.experience}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{registration.user.school}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{formatDate(registration.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button
                            onClick={() => window.open(`/dashboard?userId=${registration.user.id}`, '_blank')}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-[#1A1A1E] rounded-lg p-6 text-center">
              <p className="text-gray-300">No registrations yet for this event.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Form for creating/editing an event
  if (isCreating || editingEvent) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h2>
            <button 
              onClick={() => {
                setFormData(initialFormState);
                setEditingEvent(null);
                setIsCreating(false);
              }}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Cancel
            </button>
          </div>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Event Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  ></textarea>
                </div>
                
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                </div>
                
                {/* Theme */}
                <div>
                  <label htmlFor="theme" className="block text-gray-300 text-sm font-medium mb-2">
                    Theme
                  </label>
                  <input
                    type="text"
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Event Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-gray-300 text-sm font-medium mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-gray-300 text-sm font-medium mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    />
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-gray-300 text-sm font-medium mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                {/* Registration Deadline */}
                <div>
                  <label htmlFor="registrationDeadline" className="block text-gray-300 text-sm font-medium mb-2">
                    Registration Deadline
                  </label>
                  <input
                    type="date"
                    id="registrationDeadline"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleInputChange}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                </div>
                
                {/* Maximum Participants */}
                <div>
                  <label htmlFor="maximumParticipants" className="block text-gray-300 text-sm font-medium mb-2">
                    Maximum Participants
                  </label>
                  <input
                    type="number"
                    id="maximumParticipants"
                    name="maximumParticipants"
                    value={formData.maximumParticipants}
                    onChange={handleInputChange}
                    min="0"
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                </div>
                
                {/* Discord Link */}
                <div>
                  <label htmlFor="discordLink" className="block text-gray-300 text-sm font-medium mb-2">
                    Discord Link
                  </label>
                  <input
                    type="url"
                    id="discordLink"
                    name="discordLink"
                    value={formData.discordLink}
                    onChange={handleInputChange}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="https://discord.gg/..."
                  />
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary py-3 px-6"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // Main events list view
  return (
    <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Event Management</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-[#FF2247] focus:border-[#FF2247] w-64"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFormData(initialFormState);
                setIsCreating(true);
              }}
              className="btn-primary py-2 px-4"
            >
              Create Event
            </motion.button>
          </div>
        </div>
        
        {filteredEvents.length === 0 ? (
          <div className="bg-[#1A1A1E] rounded-lg p-6 text-center">
            <p className="text-gray-300 mb-4">No events found matching your search.</p>
            <button
              onClick={() => setIsCreating(true)}
              className="btn-primary py-2 px-4"
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event._id} className="bg-[#1A1A1E] rounded-lg p-5 border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-300">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.startDate)} - {formatDate(event.endDate)}
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' 
                          ? 'bg-blue-900 text-blue-200' 
                          : event.status === 'ongoing'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-gray-900 text-gray-200'
                      }`}>
                        {event.status}
                      </span>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {event.registrationCount || 0} Registrations
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setViewRegistrations(event._id)}
                      className="btn-secondary py-1 px-3 text-sm"
                    >
                      View Registrations
                    </button>
                    <button
                      onClick={() => handleEditStart(event)}
                      className="btn-secondary py-1 px-3 text-sm"
                    >
                      Edit
                    </button>
                    {showConfirmDelete === event._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="bg-red-700 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setShowConfirmDelete(null)}
                          className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowConfirmDelete(event._id)}
                        className="bg-red-700 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-300 line-clamp-2">{event.description}</p>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Link 
                    href={`/events/${event._id}`}
                    className="text-[#FF2247] hover:underline text-sm"
                    target="_blank"
                  >
                    View Public Page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
