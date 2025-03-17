'use client';

import { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig.js';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import useNoFlash from '@/lib/hooks/useNoFlash';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Button hover animation
const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

// Dropdown arrow animation
const arrowAnimation = {
  closed: { rotate: 0 },
  open: { 
    rotate: 90,
    transition: { duration: 0.3 }
  }
};

// Dropdown content animation
const dropdownAnimation = {
  hidden: { 
    height: 0,
    transition: {
      height: { duration: 0.3 },
    }
  },
  visible: { 
    height: "auto",
    transition: {
      height: { duration: 0.3 },
    }
  }
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [expandedEvents, setExpandedEvents] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    state: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    eventType: '',
    hostNeeded: false,
    ageGroups: '',
    competitionLevel: '',
    requirements: ''
  });
  
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if admin is logged in
  useEffect(() => {
    const checkAdminAuth = () => {
      const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
      if (!isLoggedIn) {
        router.push('/admin');
      }
    };

    if (isMounted) {
      checkAdminAuth();
      fetchEvents();
    }
  }, [isMounted, router]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsList);
      setError('');
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminId');
    router.push('/admin');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      state: '',
      startDate: '',
      endDate: '',
      registrationDeadline: '',
      eventType: '',
      hasPassed: false,
      ageGroups: '',
      competitionLevel: '',
      requirements: ''
    });
    setEditingEvent(null);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(collection(db, 'events'), formData);
      setShowEventForm(false);
      resetForm();
      await fetchEvents();
      setError('');
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to add event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event.id);
    setFormData({
      name: event.name || '',
      description: event.description || '',
      location: event.location || '',
      state: event.state || '',
      startDate: event.startDate || '',
      endDate: event.endDate || '',
      registrationDeadline: event.registrationDeadline || '',
      eventType: event.eventType || '',
      hostNeeded: event.hostNeeded || false,
      ageGroups: event.ageGroups || '',
      competitionLevel: event.competitionLevel || '',
      requirements: event.requirements || ''
    });
    setShowEventForm(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const eventRef = doc(db, 'events', editingEvent);
      await updateDoc(eventRef, formData);
      setShowEventForm(false);
      resetForm();
      await fetchEvents();
      setError('');
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'events', eventId));
        await fetchEvents();
        setError('');
      } catch (err) {
        console.error('Error deleting event:', err);
        setError('Failed to delete event. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleEventExpansion = (eventId) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>EVolve Charge | Admin Events</title>
        <meta name="description" content="Admin events management for EVolve Charge" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Event Management</h2>
            <motion.button
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
              onClick={() => {
                resetForm();
                setShowEventForm(!showEventForm);
              }}
              className="btn-primary"
            >
              {showEventForm ? 'Cancel' : 'Add New Event'}
            </motion.button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <AnimatePresence>
            {showEventForm && (
              <motion.div 
                initial={{y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8 p-6 bg-[#16161A] rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location*
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State*
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Type*
                      </label>
                      <input
                        type="text"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date*
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date*
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Deadline*
                      </label>
                      <input
                        type="date"
                        name="registrationDeadline"
                        value={formData.registrationDeadline}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age Groups
                      </label>
                      <input
                        type="text"
                        name="ageGroups"
                        value={formData.ageGroups}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Competition Level
                      </label>
                      <input
                        type="text"
                        name="competitionLevel"
                        value={formData.competitionLevel}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id="hostNeeded"
                        name="hostNeeded"
                        checked={formData.hostNeeded}
                        onChange={handleInputChange}
                        className="mr-2 text-black"
                      />
                      <label htmlFor="hostNeeded" className="text-sm font-medium text-white">
                        Has Passed
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 text-black bg-gray-200 border text-black border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 text-black bg-gray-200 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <motion.button
                      type="button"
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonHover}
                      onClick={() => {
                        resetForm();
                        setShowEventForm(false);
                      }}
                      className="mr-2 text-black bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonHover}
                      disabled={loading}
                      className="bg-[#F93236] hover:bg-red-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : editingEvent ? 'Update Event' : 'Add Event'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && !showEventForm ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-[#F93236] border-r-[#F93236] border-b-transparent border-l-transparent"></div>
              <p className="mt-2 text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 bg-[#16161A] rounded-xl">
              <p className="text-gray-400">No events found. Add your first event!</p>
            </div>
          ) : (
            <div className="bg-[#16161A] rounded-xl shadow-md overflow-hidden">
              <div className="divide-y divide-gray-700">
                {events.map((event) => (
                  <div key={event.id} className="overflow-hidden">
                    {/* Event Header - Always visible */}
                    <motion.div 
                      className="px-6 py-4 flex items-center justify-between cursor-pointer"
                      initial={{ backgroundColor: "#16161A" }}
                      whileHover={{ backgroundColor: "#2e2e2e" }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleEventExpansion(event.id)}
                    >
                      <div className="flex items-center">
                        {/* Dropdown icon with animation */}
                        <motion.svg 
                          variants={arrowAnimation}
                          initial="closed"
                          animate={expandedEvents[event.id] ? "open" : "closed"}
                          className="h-5 w-5 mr-2" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path d="M9 5l7 7-7 7"></path>
                        </motion.svg>
                        {/* Event Name */}
                        <span className="font-bold text-white">{event.name}</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05, color: "#a5b4fc" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditEvent(event);
                          }}
                          className="text-indigo-400"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05, color: "#f87171" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(event.id);
                          }}
                          className="text-red-500"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                    
                    {/* Expanded Details with Animation */}
                    <AnimatePresence>
                      {expandedEvents[event.id] && (
                        <motion.div 
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownAnimation}
                          className="px-6 py-4 bg-[#2e2e2e] grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                        >
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Date</h4>
                            <p className="text-white">
                              {event.startDate}{event.endDate ? ` to ${event.endDate}` : ''}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Location</h4>
                            <p className="text-white">{event.location}, {event.state}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Event Type</h4>
                            <p className="text-white">{event.eventType}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Registration Deadline</h4>
                            <p className="text-white">{event.registrationDeadline}</p>
                          </div>
                          
                          {event.ageGroups && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400">Age Groups</h4>
                              <p className="text-white">{event.ageGroups}</p>
                            </div>
                          )}
                          
                          {event.competitionLevel && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400">Competition Level</h4>
                              <p className="text-white">{event.competitionLevel}</p>
                            </div>
                          )}
                          
                          <div className="md:col-span-2">
                            <h4 className="text-sm font-medium text-gray-400">Description</h4>
                            <p className="text-white">{event.description}</p>
                          </div>
                          
                          {event.requirements && (
                            <div className="md:col-span-2">
                              <h4 className="text-sm font-medium text-gray-400">Requirements</h4>
                              <p className="text-white">{event.requirements}</p>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Status</h4>
                            <p className="text-white">{event.hostNeeded ? 'Passed' : 'Upcoming'}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}