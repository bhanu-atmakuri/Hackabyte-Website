/**
 * User Registrations Component
 * 
 * Displays all events the user has registered for with:
 * - Event details (name, date, location)
 * - Registration status
 * - Registration details (team info, etc.)
 * - Option to view more details
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function UserRegistrations() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [expandedRegistration, setExpandedRegistration] = useState(null);
  
  // Fetch user registrations when component mounts
  useEffect(() => {
    const fetchRegistrations = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/events/register');
        const data = await response.json();
        
        if (data.success) {
          setRegistrations(data.registrations);
        } else {
          toast.error('Failed to load registration data');
        }
      } catch (error) {
        console.error('Error fetching registrations:', error);
        toast.error('Error loading registration data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRegistrations();
  }, [status]);
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Toggle expanded registration
  const toggleExpand = (id) => {
    if (expandedRegistration === id) {
      setExpandedRegistration(null);
    } else {
      setExpandedRegistration(id);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
      </div>
    );
  }
  
  if (!registrations || registrations.length === 0) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">My Event Registrations</h2>
          <div className="py-8 text-center">
            <p className="text-gray-300 mb-4">You haven't registered for any events yet.</p>
            <Link href="/events" className="btn-primary inline-block py-2 px-4">
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">My Event Registrations</h2>
        
        <div className="space-y-4">
          {registrations.map((registration) => (
            <motion.div
              key={registration._id}
              className="border border-gray-800 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Registration Header */}
              <div 
                className="bg-[#212129] p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleExpand(registration._id)}
              >
                <div>
                  <h3 className="text-white font-bold text-lg">{registration.event.name}</h3>
                  <div className="flex items-center text-gray-300 text-sm mt-1">
                    <span className="mr-3">{formatDate(registration.event.startDate)}</span>
                    <span>{registration.event.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs mr-3 ${
                    registration.status === 'confirmed' 
                      ? 'bg-green-900 text-green-300' 
                      : registration.status === 'cancelled'
                        ? 'bg-red-900 text-red-300'
                        : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                  </span>
                  
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedRegistration === registration._id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Registration Details */}
              {expandedRegistration === registration._id && (
                <div className="p-4 border-t border-gray-800 bg-[#1A1A1E]">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[#FF2247] font-medium mb-3">Registration Details</h4>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-gray-400 text-sm">Registration Date</p>
                          <p className="text-white">{formatDate(registration.createdAt)}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm">Participating as</p>
                          <p className="text-white">
                            {registration.hasTeam 
                              ? `Team (${registration.teamSize} members)` 
                              : registration.needsTeam
                                ? 'Looking for a team'
                                : 'Individual participant'
                            }
                          </p>
                        </div>
                        
                        {registration.hasTeam && (
                          <>
                            {registration.teamName && (
                              <div>
                                <p className="text-gray-400 text-sm">Team Name</p>
                                <p className="text-white">{registration.teamName}</p>
                              </div>
                            )}
                            
                            <div>
                              <p className="text-gray-400 text-sm">Team Members</p>
                              <p className="text-white">{registration.teamMemberNames}</p>
                            </div>
                          </>
                        )}
                        
                        <div>
                          <p className="text-gray-400 text-sm">Discord Tag</p>
                          <p className="text-white">{registration.discordTag}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-[#FF2247] font-medium mb-3">Event Information</h4>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-gray-400 text-sm">Event Date</p>
                          <p className="text-white">
                            {formatDate(registration.event.startDate)} - {formatDate(registration.event.endDate)}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white">{registration.event.location}</p>
                        </div>
                        
                        {registration.event.discordLink && (
                          <div>
                            <p className="text-gray-400 text-sm">Discord Server</p>
                            <a 
                              href={registration.event.discordLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[#FF2247] hover:underline"
                            >
                              Join Discord Server
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Link 
                          href={`/events/${registration.event._id}`} 
                          className="text-[#FF2247] hover:underline text-sm inline-flex items-center"
                        >
                          View Event Details
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                        
                        {registration.status !== 'cancelled' && (
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (confirm('Are you sure you want to cancel your registration?')) {
                                try {
                                  const response = await fetch(`/api/events/register?registrationId=${registration._id}`, {
                                    method: 'DELETE',
                                  });
                                  
                                  const result = await response.json();
                                  
                                  if (result.success) {
                                    toast.success('Registration cancelled successfully');
                                    // Update local state
                                    setRegistrations(registrations.map(reg => 
                                      reg._id === registration._id ? {...reg, status: 'cancelled'} : reg
                                    ));
                                  } else {
                                    toast.error(result.message || 'Failed to cancel registration');
                                  }
                                } catch (error) {
                                  console.error('Error cancelling registration:', error);
                                  toast.error('Error cancelling registration');
                                }
                              }
                            }}
                            className="bg-gray-700 text-gray-300 hover:bg-gray-600 py-1 px-3 rounded text-sm"
                          >
                            Cancel Registration
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/events" className="text-[#FF2247] hover:underline text-sm">
            Browse more events
          </Link>
        </div>
      </div>
    </div>
  );
}
