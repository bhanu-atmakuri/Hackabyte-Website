'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { db } from '../../firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Head from 'next/head';
import { ensureAdminAuth, ensureUserAuth } from '@/lib/auth/adminAuth';
import useNoFlash from '@/lib/hooks/useNoFlash';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function AdminDashboard() {
  // State management
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if admin is logged in and fetch data
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        setLoading(true);
        
        // First check if user is logged in at all
        const isUserLoggedIn = await ensureUserAuth();
        if (!isUserLoggedIn) {
          // Not logged in at all, redirect to auth
          router.push('/auth');
          return;
        }
        
        // Now check if user has admin privileges
        const isAdmin = await ensureAdminAuth();
        if (!isAdmin) {
          console.log('Regular user detected, redirecting to user dashboard');
          // User is logged in but not an admin
          router.push('/dashboard');
          return;
        }
        
        // User is an admin, continue with admin dashboard logic
        const adminId = sessionStorage.getItem('adminId');
        
        if (adminId) {
          try {
            const adminRef = doc(db, 'admins', adminId);
            const adminSnap = await getDoc(adminRef);
            
            if (adminSnap.exists()) {
              const adminData = adminSnap.data();
              setAdmin(adminData);
              setFormData({
                name: adminData.name || '',
                email: adminData.email || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              });
            } else {
              // Admin document not found, redirect to login
              sessionStorage.removeItem('adminLoggedIn');
              sessionStorage.removeItem('adminId');
              router.push('/auth');
            }
          } catch (err) {
            console.error('Error fetching admin data:', err);
            setError('Failed to load your profile. Please try again.');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      checkAdminAuth();
    }
  }, [isMounted, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setUnsavedChanges(true);
    // Clear any previous messages
    setError('');
    setSuccess('');
  };

  const handleLogout = () => {
    if (unsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to logout?')) {
        return;
      }
    }
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminId');
    router.push('/auth');
  };

  const validateForm = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Password validation if user is changing password
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        setError('Current password is required to set a new password.');
        return false;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New password and confirmation do not match.');
        return false;
      }
      
      if (formData.newPassword && formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters long.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSaving(true);
      setError('');
      
      const adminId = sessionStorage.getItem('adminId');
      if (!adminId) {
        throw new Error('Admin session not found');
      }
      
      // Prepare data for update
      const updateData = {
        name: formData.name,
        email: formData.email,
      };
      
      // Handle password update
      if (showPasswordSection && formData.currentPassword && formData.newPassword) {
        // In a real application, you would verify the current password server-side
        // and hash the new password before storing it
        if (admin.password !== formData.currentPassword) {
          setError('Current password is incorrect.');
          setIsSaving(false);
          return;
        }
        
        updateData.password = formData.newPassword;
      }
      
      // Update admin document
      const adminRef = doc(db, 'admins', adminId);
      await updateDoc(adminRef, updateData);
      
      // Update local state
      setAdmin(prevAdmin => ({
        ...prevAdmin,
        ...updateData
      }));
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setShowPasswordSection(false);
      setUnsavedChanges(false);
      setSuccess('Profile updated successfully!');
      
      // Update session storage if email changed
      if (formData.email !== admin.email) {
        sessionStorage.setItem('adminEmail', formData.email);
      }
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
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
    <div className="min-h-screen bg-[#1A1A1E]">
      <Head>
        <title>Hackabyte | Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for Hackabyte" />
      </Head>

      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">
                {admin ? `Welcome back, ${admin.name || 'Admin'}` : 'Welcome to your dashboard'}
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Account Information Section */}
            <div className="md:col-span-2">
              <div className="bg-[#16161A] rounded-xl shadow-md overflow-hidden border border-gray-800">
                {/* Gradient strip at the top */}
                <div className="h-2 w-full bg-gradient-to-r from-[#F93236] to-[#FF003C]"></div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
                        
                  {error && (
                    <div className="mb-6 p-3 bg-red-900/30 text-red-400 rounded-lg text-sm border border-red-800">
                      {error}
                    </div>
                  )}
                  
                  {success && (
                    <div className="mb-6 p-3 bg-green-900/30 text-green-400 rounded-lg text-sm border border-green-800">
                      {success}
                    </div>
                  )}
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-[#FF2247] border-r-[#FF2247] border-b-transparent border-l-transparent"></div>
                      <p className="mt-2 text-gray-400">Loading your profile...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                            placeholder="Your name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      {/* Password Section Toggle */}
                      <div className="mb-6">
                        <button
                          type="button"
                          onClick={() => setShowPasswordSection(!showPasswordSection)}
                          className="text-[#FF2247] hover:text-[#FF003C] flex items-center font-medium transition-colors"
                        >
                          {showPasswordSection ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              Hide Password Section
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              Change Password
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Password Fields */}
                      <AnimatePresence>
                        {showPasswordSection && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-800 pt-6">
                              <div>
                                <label htmlFor="currentPassword" className="block text-gray-300 text-sm font-medium mb-2">
                                  Current Password*
                                </label>
                                <input
                                  type="password"
                                  id="currentPassword"
                                  name="currentPassword"
                                  value={formData.currentPassword}
                                  onChange={handleInputChange}
                                  className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                                  placeholder="••••••••"
                                />
                              </div>
                              
                              <div className="md:col-span-2 h-0 md:h-auto"></div>
                              
                              <div>
                                <label htmlFor="newPassword" className="block text-gray-300 text-sm font-medium mb-2">
                                  New Password*
                                </label>
                                <input
                                  type="password"
                                  id="newPassword"
                                  name="newPassword"
                                  value={formData.newPassword}
                                  onChange={handleInputChange}
                                  className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                                  placeholder="••••••••"
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                                  Confirm New Password*
                                </label>
                                <input
                                  type="password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  value={formData.confirmPassword}
                                  onChange={handleInputChange}
                                  className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                                  placeholder="••••••••"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex justify-end">
                        <motion.button
                          type="submit"
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonHover}
                          disabled={isSaving}
                          className="bg-[#FF2247] hover:bg-[#e01f41] text-white py-2 px-6 rounded-lg disabled:opacity-50"
                        >
                          {isSaving ? 'Saving Changes...' : 'Save Changes'}
                        </motion.button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick Information Panel */}
            <div className="md:col-span-1">
              <div className="bg-[#16161A] rounded-xl shadow-md overflow-hidden border border-gray-800 sticky top-24">
                {/* Gradient strip at the top */}
                <div className="h-2 w-full bg-gradient-to-r from-[#F93236] to-[#FF003C]"></div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
                  
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="/admin/events"
                        className="flex items-center text-gray-300 hover:text-[#FF2247] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Manage Events
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center text-gray-300 hover:text-[#FF2247] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        User Management
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center text-gray-300 hover:text-[#FF2247] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Content Management
                      </a>
                    </li>
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      For technical support or questions about your admin account, please contact our support team.
                    </p>
                    <a 
                      href="mailto:support@hackabyte.com" 
                      className="inline-flex items-center text-[#FF2247] hover:text-[#FF003C] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
