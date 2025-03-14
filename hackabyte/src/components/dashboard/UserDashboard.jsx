/**
 * User Dashboard Component
 * 
 * Client component that displays user profile and event registrations:
 * - User information section
 * - List of registered events
 * - Registration links for upcoming events
 * - Profile editing capabilities
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react.js';
import Link from 'next/link';
import Container from '../shared/Container';
import { upcomingEvents } from '../../lib/data/upcomingEvents';

export default function UserDashboard({ session }) {
  // State for user data and registrations
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch user data and registrations
  useEffect(() => {
    async function fetchUserData() {
      try {
        setIsLoading(true);
        
        // Fetch user profile
        const userResponse = await fetch('/api/users/me');
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Fetch user registrations
        const registrationsResponse = await fetch('/api/users/me/registrations');
        if (!registrationsResponse.ok) throw new Error('Failed to fetch registrations');
        const registrationsData = await registrationsResponse.json();
        
        setUser(userData);
        setRegistrations(registrationsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load your information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    // For now, we'll mock the data since the endpoints might not be ready
    function mockUserData() {
      setIsLoading(true);
      
      // Mock user data based on session
      setTimeout(() => {
        setUser({
          id: session?.user?.id || '123',
          fullName: session?.user?.name || 'John Doe',
          email: session?.user?.email || 'john@example.com',
          school: 'Hackabyte High School',
          age: 16,
          phoneNumber: '(555) 123-4567',
          parentName: 'Jane Doe',
          parentEmail: 'jane@example.com',
          parentPhone: '(555) 987-6543',
          isVerified: true,
        });
        
        // Mock registrations data
        setRegistrations([
          {
            id: 'reg1',
            eventId: upcomingEvents[0].title,
            eventTitle: upcomingEvents[0].title,
            eventDate: upcomingEvents[0].date,
            eventLocation: upcomingEvents[0].location,
            registrationDate: new Date().toISOString(),
            teamPreference: 'Working alone',
            confirmationSent: true,
          }
        ]);
        
        setIsLoading(false);
      }, 1000);
    }
    
    mockUserData();
    // When the API endpoints are ready, uncomment the line below and remove mockUserData()
    // fetchUserData();
    
  }, [session]);
  
  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  
  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF2247]"></div>
          <p className="mt-4 text-gray-300">Loading your dashboard...</p>
        </div>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="p-6 max-w-md mx-auto bg-[#16161A] rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <div className="py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        {/* User Profile Card */}
        <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 mb-10">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Profile</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#FF2247] mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Full Name</span>
                    <span className="text-white">{user?.fullName}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Email</span>
                    <span className="text-white">{user?.email}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Phone Number</span>
                    <span className="text-white">{user?.phoneNumber || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">School</span>
                    <span className="text-white">{user?.school}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Age</span>
                    <span className="text-white">{user?.age}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#FF2247] mb-4">Parent/Guardian Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Name</span>
                    <span className="text-white">{user?.parentName}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Email</span>
                    <span className="text-white">{user?.parentEmail}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Phone Number</span>
                    <span className="text-white">{user?.parentPhone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Edit Profile
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Registered Events */}
        <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 mb-10">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Registered Events</h2>
            
            {registrations.length > 0 ? (
              <div className="space-y-6">
                {registrations.map(registration => (
                  <div key={registration.id} className="border border-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{registration.eventTitle}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-400">Date</span>
                        <span className="text-gray-300">{registration.eventDate}</span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-400">Location</span>
                        <span className="text-gray-300">{registration.eventLocation}</span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-400">Registered</span>
                        <span className="text-gray-300">{new Date(registration.registrationDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-400">Team Preference</span>
                        <span className="text-gray-300">{registration.teamPreference}</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link href={`/events/${registration.eventId}`} className="text-[#FF2247] hover:underline">
                        View Event Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-6">You haven't registered for any events yet.</p>
                <Link href="/events" className="btn-primary">
                  Browse Events
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.slice(0, 2).map((event, index) => {
                // Check if already registered
                const isRegistered = registrations.some(reg => reg.eventId === event.title);
                
                return (
                  <div key={index} className="border border-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300 mb-4">{event.date} • {event.location}</p>
                    <p className="text-gray-400 mb-6 line-clamp-2">{event.description}</p>
                    
                    <div className="flex justify-end">
                      {isRegistered ? (
                        <span className="text-green-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Registered
                        </span>
                      ) : (
                        <Link 
                          href={`/events/register?eventId=${encodeURIComponent(event.title)}`}
                          className="btn-primary"
                        >
                          Register Now
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/events" className="text-[#FF2247] hover:underline">
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
