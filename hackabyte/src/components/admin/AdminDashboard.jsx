/**
 * Admin Dashboard Component
 * 
 * Client component that displays administrative interface with:
 * - Tab-based navigation between different admin views
 * - User management table with search and filters
 * - Event registration management with filtering by event
 * - Data export functionality
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import Container from '../shared/Container';

// Tab options for admin interface
const TABS = {
  USERS: 'users',
  REGISTRATIONS: 'registrations',
};

export default function AdminDashboard({ session }) {
  // Active tab state
  const [activeTab, setActiveTab] = useState(TABS.USERS);
  // Data states
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and filter states
  const [userSearch, setUserSearch] = useState('');
  const [registrationEventFilter, setRegistrationEventFilter] = useState('all');
  
  // Export state
  const [isExporting, setIsExporting] = useState(false);
  
  // Fetch admin data
  useEffect(() => {
    async function fetchAdminData() {
      try {
        setIsLoading(true);
        
        // Fetch users
        const usersResponse = await fetch('/api/admin/users');
        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        const usersData = await usersResponse.json();
        
        // Fetch registrations
        const registrationsResponse = await fetch('/api/admin/registrations');
        if (!registrationsResponse.ok) throw new Error('Failed to fetch registrations');
        const registrationsData = await registrationsResponse.json();
        
        setUsers(usersData);
        setRegistrations(registrationsData);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load administrative data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    // For now, we'll mock the data since the endpoints might not be ready
    function mockAdminData() {
      setIsLoading(true);
      
      setTimeout(() => {
        // Mock users data
        setUsers([
          {
            id: 'user1',
            fullName: 'John Doe',
            email: 'john@example.com',
            school: 'Hackabyte High School',
            age: 16,
            phoneNumber: '(555) 123-4567',
            isVerified: true,
            createdAt: '2025-01-15T08:30:00.000Z',
            role: 'user',
          },
          {
            id: 'user2',
            fullName: 'Jane Smith',
            email: 'jane@example.com',
            school: 'Tech Middle School',
            age: 14,
            phoneNumber: '(555) 987-6543',
            isVerified: true,
            createdAt: '2025-02-20T10:15:00.000Z',
            role: 'user',
          },
          {
            id: 'user3',
            fullName: 'Admin User',
            email: 'admin@hackabyte.org',
            school: 'Hackabyte Organization',
            age: 18,
            phoneNumber: '(555) 555-5555',
            isVerified: true,
            createdAt: '2024-12-10T09:00:00.000Z',
            role: 'admin',
          },
        ]);
        
        // Mock registrations data
        setRegistrations([
          {
            id: 'reg1',
            userId: 'user1',
            userName: 'John Doe',
            userEmail: 'john@example.com',
            eventId: 'Winter Hackathon - CA',
            eventTitle: 'Winter Hackathon - CA',
            eventDate: 'March 8-9, 2025',
            registrationDate: '2025-02-01T14:30:00.000Z',
            teamPreference: 'Working alone',
            codingExperience: 'Intermediate',
            discordJoined: true,
            confirmationSent: true,
          },
          {
            id: 'reg2',
            userId: 'user2',
            userName: 'Jane Smith',
            userEmail: 'jane@example.com',
            eventId: 'Spring Hackathon - WA',
            eventTitle: 'Spring Hackathon - WA',
            eventDate: 'March 29-30, 2025',
            registrationDate: '2025-03-01T11:45:00.000Z',
            teamPreference: 'Looking for team',
            codingExperience: 'Beginner',
            discordJoined: false,
            confirmationSent: true,
          },
        ]);
        
        setIsLoading(false);
      }, 1000);
    }
    
    mockAdminData();
    // When the API endpoints are ready, uncomment the line below and remove mockAdminData()
    // fetchAdminData();
    
  }, []);
  
  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  
  // Export data to CSV
  const exportToCSV = (data, filename) => {
    setIsExporting(true);
    
    try {
      // Convert data to CSV format
      const replacer = (key, value) => value === null ? '' : value;
      const header = Object.keys(data[0]);
      const csv = [
        header.join(','), // CSV header row
        ...data.map(row => // CSV data rows
          header.map(fieldName => 
            JSON.stringify(row[fieldName], replacer)
          ).join(',')
        )
      ].join('\r\n');
      
      // Create download link
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error exporting data:', err);
      setError('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  // Filter users based on search
  const filteredUsers = users.filter(user => {
    if (!userSearch) return true;
    
    const searchLower = userSearch.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.school.toLowerCase().includes(searchLower)
    );
  });
  
  // Filter registrations based on event
  const filteredRegistrations = registrations.filter(registration => {
    if (registrationEventFilter === 'all') return true;
    return registration.eventId === registrationEventFilter;
  });
  
  // Get unique event options for filter
  const eventOptions = [
    'all', 
    ...new Set(registrations.map(reg => reg.eventId))
  ];
  
  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF2247]"></div>
          <p className="mt-4 text-gray-300">Loading administrative data...</p>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Logged in as <span className="text-white">{session?.user?.email}</span>
            </span>
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        {/* Admin navigation tabs */}
        <div className="flex border-b border-gray-800 mb-8">
          <button
            className={`pb-4 px-6 text-lg font-medium border-b-2 ${
              activeTab === TABS.USERS
                ? 'text-[#FF2247] border-[#FF2247]'
                : 'text-gray-400 border-transparent hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab(TABS.USERS)}
          >
            Users
          </button>
          <button
            className={`pb-4 px-6 text-lg font-medium border-b-2 ${
              activeTab === TABS.REGISTRATIONS
                ? 'text-[#FF2247] border-[#FF2247]'
                : 'text-gray-400 border-transparent hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab(TABS.REGISTRATIONS)}
          >
            Event Registrations
          </button>
        </div>
        
        {/* Users tab content */}
        {activeTab === TABS.USERS && (
          <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Registered Users</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search users..."
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-2 pl-10 w-64 focus:ring-[#FF2247] focus:border-[#FF2247]"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => exportToCSV(users, 'hackabyte-users')}
                    disabled={isExporting}
                    className="btn-secondary flex items-center"
                  >
                    {isExporting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export CSV
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
              
              {/* Users table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-[#1A1A1E]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        School
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Age
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Registered
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#16161A] divide-y divide-gray-800">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{user.fullName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{user.school}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{user.age}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'admin' 
                                ? 'bg-purple-900 text-purple-200' 
                                : 'bg-gray-700 text-gray-200'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.isVerified 
                                ? 'bg-green-900 text-green-200' 
                                : 'bg-yellow-900 text-yellow-200'
                            }`}>
                              {user.isVerified ? 'Verified' : 'Unverified'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-[#FF2247] hover:text-red-400 mr-4">
                              View
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-gray-400">
                          No users found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Registrations tab content */}
        {activeTab === TABS.REGISTRATIONS && (
          <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Event Registrations</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <select
                      value={registrationEventFilter}
                      onChange={(e) => setRegistrationEventFilter(e.target.value)}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-2 w-64 focus:ring-[#FF2247] focus:border-[#FF2247]"
                    >
                      <option value="all">All Events</option>
                      {eventOptions.filter(option => option !== 'all').map((eventId) => (
                        <option key={eventId} value={eventId}>
                          {eventId}
                        </option>
                      ))}
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => exportToCSV(filteredRegistrations, 'hackabyte-registrations')}
                    disabled={isExporting}
                    className="btn-secondary flex items-center"
                  >
                    {isExporting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export CSV
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
              
              {/* Registrations table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-[#1A1A1E]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Event
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Registration Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Team Preference
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Experience
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Discord
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#16161A] divide-y divide-gray-800">
                    {filteredRegistrations.length > 0 ? (
                      filteredRegistrations.map((registration) => (
                        <tr key={registration.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-white">{registration.userName}</div>
                                <div className="text-xs text-gray-400">{registration.userEmail}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{registration.eventTitle}</div>
                            <div className="text-xs text-gray-400">{registration.eventDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">
                              {new Date(registration.registrationDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{registration.teamPreference}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              registration.codingExperience === 'Beginner' 
                                ? 'bg-blue-900 text-blue-200' 
                                : registration.codingExperience === 'Intermediate'
                                ? 'bg-green-900 text-green-200'
                                : 'bg-purple-900 text-purple-200'
                            }`}>
                              {registration.codingExperience}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              registration.discordJoined 
                                ? 'bg-indigo-900 text-indigo-200' 
                                : 'bg-gray-700 text-gray-200'
                            }`}>
                              {registration.discordJoined ? 'Joined' : 'Not Joined'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              registration.confirmationSent 
                                ? 'bg-green-900 text-green-200' 
                                : 'bg-yellow-900 text-yellow-200'
                            }`}>
                              {registration.confirmationSent ? 'Confirmed' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-[#FF2247] hover:text-red-400 mr-4">
                              View
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-gray-400">
                          No registrations found for this event.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
