'use client';

import { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig.js';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import useNoFlash from '@/lib/hooks/useNoFlash';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
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
          variants={fadeIn}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Event Management</h2>
            <button
              onClick={() => {
                resetForm();
                setShowEventForm(!showEventForm);
              }}
              className="btn-primary"
            >
              {showEventForm ? 'Cancel' : 'Add New Event'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {showEventForm && (
            <div className="mb-8 p-6 bg-[#16161A] rounded-xl shadow-md">
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
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowEventForm(false);
                    }}
                    className="mr-2 text-black bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#F93236] hover:bg-red-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : editingEvent ? 'Update Event' : 'Add Event'}
                  </button>
                </div>
              </form>
            </div>
          )}

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
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registration Deadline
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{event.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {event.startDate}{event.endDate ? ` to ${event.endDate}` : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {event.location}, {event.state}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{event.eventType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{event.registrationDeadline}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}