'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { ensureAdminAuth, ensureRegularUserAuth } from '@/lib/auth/adminAuth';
import useNoFlash from '@/lib/hooks/useNoFlash';
import { db, auth } from '@/app/firebaseConfig.js';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

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

export default function UserDashboard() {
  // State management
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    discordTag: '',
    dateOfBirth: '',
    isMinor: false,
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    codingExperience: {
      Beginner: false,
      Intermediate: false,
      Advanced: false
    },
    dietaryRestrictions: {
      Vegetarian: false,
      Vegan: false,
      'Gluten-free': false,
      Treenuts: false,
      Details: ''
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      
      try {
        // If user is an admin, redirect to admin dashboard
        const isAdmin = await ensureAdminAuth();
        if (isAdmin) {
          console.log('Admin user detected, redirecting to admin dashboard');
          router.push('/admin');
          return;
        }
        
        // If user is not logged in at all, redirect to auth page
        const isRegularUser = await ensureRegularUserAuth();
        if (!isRegularUser) {
          console.log('No valid user session, redirecting to login');
          router.push('/auth');
          return;
        }
        
        // Get current authenticated user
        const currentUser = auth.currentUser;
        setUser(currentUser);
        
        if (currentUser) {
          // Get additional user data from Firestore
          const userRef = collection(db, 'users');
          const q = query(userRef, where('uid', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const data = userDoc.data();
            setUserData({
              ...data,
              id: userDoc.id,
            });
            
            // Format phone number from number back to string if needed
            const phoneStr = data.phone ? data.phone.toString() : '';
            // Format parent phone if exists
            const parentPhoneStr = data.parentPhone ? data.parentPhone.toString() : '';
            
            // Convert Firestore timestamp to date string format for input
            let dateOfBirthStr = '';
            if (data.birthday && data.birthday.toDate) {
              const date = data.birthday.toDate();
              dateOfBirthStr = date.toISOString().split('T')[0];
            }
            
            // Set form data with the user's information
            setFormData({
              name: data.name || '',
              email: data.email || '',
              phone: phoneStr || '',
              school: data.school || '',
              discordTag: data.discordTag || '',
              dateOfBirth: dateOfBirthStr || '',
              isMinor: data.isMinor || false,
              parentName: data.parentName || '',
              parentEmail: data.parentEmail || '',
              parentPhone: parentPhoneStr || '',
              codingExperience: data.codingExperienceLevel || {
                Beginner: false,
                Intermediate: false,
                Advanced: false
              },
              dietaryRestrictions: data.dietaryRestrictions || {
                Vegetarian: false,
                Vegan: false,
                'Gluten-free': false,
                Treenuts: false,
                Details: ''
              },
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            });
          } else {
            console.error('User document not found in Firestore');
            setError('Unable to load user profile data');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setError('Error loading user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      checkAuth();
    }
  }, [isMounted, router]);

  // Check if user is under 18 when date of birth changes
  useEffect(() => {
    if (!formData.dateOfBirth) {
      setFormData(prev => ({ ...prev, isMinor: false }));
      return;
    }

    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    setFormData(prev => ({ ...prev, isMinor: age < 18 }));
  }, [formData.dateOfBirth]);

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

  // Handle coding experience selection
  const handleCodingExperienceChange = (experience) => {
    setFormData(prev => ({
      ...prev,
      codingExperience: {
        Beginner: false,
        Intermediate: false,
        Advanced: false,
        [experience]: true
      }
    }));
    setUnsavedChanges(true);
  };

  // Handle dietary restriction checkbox changes
  const handleDietaryRestrictionChange = (restriction) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: {
        ...prev.dietaryRestrictions,
        [restriction]: !prev.dietaryRestrictions[restriction]
      }
    }));
    setUnsavedChanges(true);
  };

  // Handle dietary details change
  const handleDietaryDetailsChange = (e) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: {
        ...prev.dietaryRestrictions,
        Details: e.target.value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleLogout = () => {
    if (unsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to logout?')) {
        return;
      }
    }
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userEmail');
    auth.signOut();
    router.push('/auth');
  };

  const validateForm = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Phone validation (optional but validate if provided)
    const phoneRegex = /^[0-9]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number.');
      return false;
    }

    // Validate date of birth if provided
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      if (isNaN(birthDate.getTime())) {
        setError('Please enter a valid date of birth.');
        return false;
      }
    }

    // Validate parent/guardian information if user is a minor
    if (formData.isMinor) {
      if (!formData.parentName) {
        setError('Parent/guardian name is required for minors.');
        return false;
      }
      
      if (!formData.parentEmail) {
        setError('Parent/guardian email is required for minors.');
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
        setError('Please enter a valid parent/guardian email address.');
        return false;
      }
      
      if (!formData.parentPhone) {
        setError('Parent/guardian phone is required for minors.');
        return false;
      } else if (!/^[0-9]{10,}$/.test(formData.parentPhone.replace(/\D/g, ''))) {
        setError('Please enter a valid parent/guardian phone number.');
        return false;
      }
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
      
      if (!userData || !userData.id) {
        throw new Error('User data not found');
      }

      // Handle password change if requested
      if (showPasswordSection && formData.currentPassword && formData.newPassword) {
        try {
          // Re-authenticate user before changing password
          const credential = EmailAuthProvider.credential(
            user.email,
            formData.currentPassword
          );
          
          // Reauthenticate
          await reauthenticateWithCredential(user, credential);
          
          // Update password
          await updatePassword(user, formData.newPassword);
        } catch (error) {
          console.error('Error updating password:', error);
          if (error.code === 'auth/wrong-password') {
            setError('Current password is incorrect.');
          } else {
            setError('Failed to update password. ' + error.message);
          }
          setIsSaving(false);
          return;
        }
      }
      
      // Format phone as number for Firebase
      const phoneNumber = parseInt(formData.phone.replace(/\D/g, ''), 10) || 0;
      // Format parent phone if provided
      const parentPhoneNumber = parseInt(formData.parentPhone.replace(/\D/g, ''), 10) || 0;
      
      // Prepare data for update
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: phoneNumber,
        school: formData.school,
        discordTag: formData.discordTag,
        birthday: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
        isMinor: formData.isMinor,
        parentName: formData.isMinor ? formData.parentName : "",
        parentEmail: formData.isMinor ? formData.parentEmail : "",
        parentPhone: formData.isMinor ? parentPhoneNumber : 0,
        codingExperienceLevel: formData.codingExperience,
        dietaryRestrictions: formData.dietaryRestrictions,
        updatedAt: new Date()
      };
      
      // Update user document in Firestore
      const userRef = doc(db, 'users', userData.id);
      await updateDoc(userRef, updateData);
      
      // Update local state
      setUserData(prevData => ({
        ...prevData,
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
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1E]">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1E]">
      <Head>
        <title>Hackabyte | User Dashboard</title>
        <meta name="description" content="User dashboard for Hackabyte" />
      </Head>

      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">User Dashboard</h1>
              <p className="text-gray-400">
                Welcome back, {userData?.name || 'User'}
              </p>
            </div>
            {/* Logout button removed */}
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
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Existing fields */}
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
                      
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-gray-300 text-sm font-medium mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="school" className="block text-gray-300 text-sm font-medium mb-2">
                          School
                        </label>
                        <input
                          type="text"
                          id="school"
                          name="school"
                          value={formData.school}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                          placeholder="Your school name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="discordTag" className="block text-gray-300 text-sm font-medium mb-2">
                          Discord Username
                        </label>
                        <input
                          type="text"
                          id="discordTag"
                          name="discordTag"
                          value={formData.discordTag}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                          placeholder="username#0000"
                        />
                      </div>
                    </div>

                    {/* Parent/Guardian Information (conditional) */}
                    {formData.isMinor && (
                      <div className="mb-8 border-t border-gray-800 pt-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Parent/Guardian Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="parentName" className="block text-gray-300 text-sm font-medium mb-2">
                              Parent/Guardian Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="parentName"
                              name="parentName"
                              value={formData.parentName}
                              onChange={handleInputChange}
                              required={formData.isMinor}
                              className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                              placeholder="Jane Doe"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="parentEmail" className="block text-gray-300 text-sm font-medium mb-2">
                              Parent/Guardian Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="parentEmail"
                              name="parentEmail"
                              value={formData.parentEmail}
                              onChange={handleInputChange}
                              required={formData.isMinor}
                              className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                              placeholder="parent@example.com"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="parentPhone" className="block text-gray-300 text-sm font-medium mb-2">
                              Parent/Guardian Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              id="parentPhone"
                              name="parentPhone"
                              value={formData.parentPhone}
                              onChange={handleInputChange}
                              required={formData.isMinor}
                              className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                              placeholder="(123) 456-7890"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Coding Experience Section */}
                    <div className="mb-8 border-t border-gray-800 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Coding Experience Level</h3>
                      <div className="space-y-3">
                        {["Beginner", "Intermediate", "Advanced"].map((level) => (
                          <div key={level} className="flex items-center">
                            <input
                              type="radio"
                              id={`coding-${level}`}
                              name="codingExperience"
                              checked={formData.codingExperience[level]}
                              onChange={() => handleCodingExperienceChange(level)}
                              className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                            />
                            <label htmlFor={`coding-${level}`} className="ml-3 block text-gray-300">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Dietary Restrictions Section */}
                    <div className="mb-8 border-t border-gray-800 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Dietary Restrictions</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {["Vegetarian", "Vegan", "Gluten-free", "Treenuts"].map((restriction) => (
                          <div key={restriction} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`diet-${restriction}`}
                              checked={formData.dietaryRestrictions[restriction]}
                              onChange={() => handleDietaryRestrictionChange(restriction)}
                              className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                            />
                            <label htmlFor={`diet-${restriction}`} className="ml-3 block text-gray-300">
                              {restriction}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div>
                        <label htmlFor="dietDetails" className="block text-gray-300 text-sm font-medium mb-2">
                          Additional Dietary Information
                        </label>
                        <textarea
                          id="dietDetails"
                          value={formData.dietaryRestrictions.Details}
                          onChange={handleDietaryDetailsChange}
                          className="w-full p-3 bg-[#1A1A1E] border border-gray-700 text-white rounded-lg focus:ring-[#FF2247] focus:border-[#FF2247]"
                          placeholder="Any additional dietary restrictions or allergies..."
                          rows={2}
                        />
                      </div>
                    </div>
                    
                    {/* Password Section Toggle */}
                    <div className="mb-6 border-t border-gray-800 pt-6">
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
                        href="/dashboard/events"
                        className="flex items-center text-gray-300 hover:text-[#FF2247] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Explore Events
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard/teams"
                        className="flex items-center text-gray-300 hover:text-[#FF2247] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Manage Teams
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard/projects"
                        className="flex items-center text-gray-300 hover:text-[#FF2247] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Projects
                      </a>
                    </li>
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-3">Upcoming Events</h3>
                    {userData?.registeredEvents?.length > 0 ? (
                      <div className="space-y-3">
                        {/* Would render registered events here */}
                        <p className="text-gray-400 text-sm">Loading your registered events...</p>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-gray-400 text-sm">
                          You haven't registered for any upcoming events yet.
                        </p>
                        <a 
                          href="/events" 
                          className="inline-flex items-center mt-2 text-[#FF2247] hover:text-[#FF003C] transition-colors text-sm"
                        >
                          Browse events
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Questions about hackathons or need technical support? Our team is here to help!
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
