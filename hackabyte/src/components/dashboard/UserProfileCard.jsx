/**
 * User Profile Card Component
 * 
 * Displays user profile information and allows editing:
 * - Personal information (name, phone, etc.)
 * - Account settings
 * - Integrates with the user API
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function UserProfileCard() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // React Hook Form setup
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isDirty, isSubmitting } 
  } = useForm();
  
  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.success) {
          setUserData(data.user);
          // Initialize form with user data
          reset(data.user);
        } else {
          toast.error('Failed to load profile data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading profile data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [status, reset]);
  
  // Form submission handler for profile updates
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setUserData(result.user);
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        throw new Error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error updating profile');
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-3/5 mb-3"></div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-6">
        <p className="text-gray-300">No profile data available. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
      <div className="p-6">
        {!isEditing ? (
          // View Mode
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">My Profile</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="btn-secondary py-2 px-4 text-sm"
              >
                Edit Profile
              </motion.button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[#FF2247] font-medium mb-4">Personal Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white">{userData.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{userData.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Phone Number</p>
                    <p className="text-white">{userData.phoneNumber || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">School</p>
                    <p className="text-white">{userData.school}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Age</p>
                    <p className="text-white">{userData.age}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-[#FF2247] font-medium mb-4">Parent/Guardian Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Parent/Guardian Name</p>
                    <p className="text-white">{userData.parentName}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Parent/Guardian Phone</p>
                    <p className="text-white">{userData.parentPhone}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Parent/Guardian Email</p>
                    <p className="text-white">{userData.parentEmail}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Dietary Restrictions</p>
                    <p className="text-white">{userData.dietaryRestrictions || 'None specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    reset(userData);
                    setIsEditing(false);
                  }}
                  className="border border-gray-600 text-gray-300 py-2 px-4 rounded-lg text-sm hover:bg-gray-800"
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                  className="btn-primary py-2 px-4 text-sm"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </div>
                  ) : 'Save Changes'}
                </motion.button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[#FF2247] font-medium mb-4">Personal Information</h3>
                
                {/* Name */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                {/* Email - readonly */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email (cannot be changed)
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={userData.email}
                    readOnly
                    disabled
                    className="bg-gray-800 border border-gray-700 text-gray-400 rounded-lg p-3 w-full"
                  />
                </div>
                
                {/* Phone */}
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-medium mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register('phoneNumber')}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                </div>
                
                {/* School */}
                <div className="mb-4">
                  <label htmlFor="school" className="block text-gray-300 text-sm font-medium mb-2">
                    School
                  </label>
                  <input
                    type="text"
                    id="school"
                    {...register('school', { required: 'School is required' })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                  {errors.school && (
                    <p className="text-red-500 text-xs mt-1">{errors.school.message}</p>
                  )}
                </div>
                
                {/* Age */}
                <div className="mb-4">
                  <label htmlFor="age" className="block text-gray-300 text-sm font-medium mb-2">
                    Age
                  </label>
                  <select
                    id="age"
                    {...register('age', { required: 'Age is required' })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  >
                    {[13, 14, 15, 16, 17, 18, 19].map(age => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-[#FF2247] font-medium mb-4">Parent/Guardian Information</h3>
                
                {/* Parent Name */}
                <div className="mb-4">
                  <label htmlFor="parentName" className="block text-gray-300 text-sm font-medium mb-2">
                    Parent/Guardian Name
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    {...register('parentName', { required: 'Parent name is required' })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-xs mt-1">{errors.parentName.message}</p>
                  )}
                </div>
                
                {/* Parent Phone */}
                <div className="mb-4">
                  <label htmlFor="parentPhone" className="block text-gray-300 text-sm font-medium mb-2">
                    Parent/Guardian Phone
                  </label>
                  <input
                    type="tel"
                    id="parentPhone"
                    {...register('parentPhone', { required: 'Parent phone is required' })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                  {errors.parentPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.parentPhone.message}</p>
                  )}
                </div>
                
                {/* Parent Email */}
                <div className="mb-4">
                  <label htmlFor="parentEmail" className="block text-gray-300 text-sm font-medium mb-2">
                    Parent/Guardian Email
                  </label>
                  <input
                    type="email"
                    id="parentEmail"
                    {...register('parentEmail', { 
                      required: 'Parent email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  />
                  {errors.parentEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.parentEmail.message}</p>
                  )}
                </div>
                
                {/* Dietary Restrictions */}
                <div className="mb-4">
                  <label htmlFor="dietaryRestrictions" className="block text-gray-300 text-sm font-medium mb-2">
                    Dietary Restrictions (optional)
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    {...register('dietaryRestrictions')}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
