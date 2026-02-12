'use client';

import { useState, useEffect } from 'react';
import { getAllEvents, deleteEvent } from '@/lib/firebase/events';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useNoFlash from '@/lib/hooks/useNoFlash';
import ExpandableContent from '@/components/shared/ExpandableContent';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const router = useRouter();
  
  // Prevent flash during hydration
  useNoFlash();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    async function fetchEvents() {
      setLoading(true);
      try {
        const eventData = await getAllEvents();
        setEvents(eventData);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, [isMounted]);
  
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };
  
  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteEvent(deleteId);
      setEvents(events.filter(event => event.id !== deleteId));
      setShowConfirmation(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event. Please try again.");
    }
  };
  
  const cancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const toggleEventDetails = (eventId) => {
    setExpandedEventId(prevId => prevId === eventId ? null : eventId);
  };
  
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>;
  }
  
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <Link
          href="/admin/events/new"
          className="btn-primary"
        >
          Add New Event
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF2247]"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-[#16161A] rounded-lg p-8 text-center border border-gray-800">
          <h3 className="text-xl font-medium mb-2">No events found</h3>
          <p className="text-gray-400 mb-6">Get started by creating your first event</p>
          <Link
            href="/admin/events/new"
            className="btn-primary"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <motion.div 
              key={event.id} 
              className="bg-[#16161A] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-5 py-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  {/* Event header section */}
                  <div className="flex-grow">
                    <div className="flex items-start gap-3">
                      <h3 className="text-xl font-medium text-white">{event.name}</h3>
                      <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.hasPassed 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-[#FF2247]/20 text-[#FF2247]'
                      }`}>
                        {event.hasPassed ? 'Past' : 'Upcoming'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.startDate)}
                        {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}, {event.state}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions buttons with updated colors */}
                  <div className="flex space-x-4 mt-3 sm:mt-0">
                    <Link
                      href={`/admin/events/edit/${event.id}`}
                      className="text-blue-500 hover:text-blue-400 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(event.id)}
                      className="text-[#FF2247] hover:text-[#FF5570] text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Age groups and competition level tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {event.ageGroups && Object.entries(event.ageGroups)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([group]) => (
                      <span 
                        key={group} 
                        className="px-2 py-0.5 text-xs rounded-full bg-[#1A1A1E] text-gray-300 border border-gray-700"
                      >
                        {group.charAt(0).toUpperCase() + group.slice(1)}
                      </span>
                    ))
                  }
                  {event.competitionLevel && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#1A1A1E] text-gray-300 border border-gray-700">
                      {event.competitionLevel}
                    </span>
                  )}
                  {event.eventType && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#1A1A1E] text-gray-300 border border-gray-700">
                      {event.eventType}
                    </span>
                  )}
                  {event.showOnPastEventsPage && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#1A1A1E] text-gray-300 border border-gray-700">
                      Visible on Past Events page
                    </span>
                  )}
                </div>

                {/* Details dropdown toggle button */}
                <button 
                  onClick={() => toggleEventDetails(event.id)} 
                  className="mt-3 w-full flex items-center justify-between px-3 py-2 text-sm bg-[#1A1A1E] text-gray-300 rounded-md hover:bg-[#1E1E22] transition-colors border border-gray-700"
                >
                  <span>{expandedEventId === event.id ? 'Hide Details' : 'Show Details'}</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: expandedEventId === event.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                {/* Dropdown content - expanded details */}
                <AnimatePresence>
                  {expandedEventId === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        {/* Description with expandable content */}
                        {event.description && (
                          <div className="mb-4">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Description</div>
                            <ExpandableContent maxHeight={60} buttonClassName="mt-1 text-xs">
                              <div className="text-gray-300 text-sm whitespace-pre-line">
                                {event.description}
                              </div>
                            </ExpandableContent>
                          </div>
                        )}
                        
                        {/* Requirements with expandable content if available */}
                        {event.requirements && (
                          <div className="mb-4">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Requirements</div>
                            <ExpandableContent maxHeight={60} buttonClassName="mt-1 text-xs">
                              <div className="text-gray-300 text-sm whitespace-pre-line">
                                {event.requirements}
                              </div>
                            </ExpandableContent>
                          </div>
                        )}
                        
                        {/* Registration deadline */}
                        {event.registrationDeadline && (
                          <div className="mb-2">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Registration Deadline</div>
                            <div className="text-gray-300 text-sm">
                              {formatDate(event.registrationDeadline)}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-[#16161A] rounded-lg p-6 max-w-md w-full border border-gray-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-gray-300">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#FF2247] text-white rounded-md hover:bg-[#E01F3F] transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
