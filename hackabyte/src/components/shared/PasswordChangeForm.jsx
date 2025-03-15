'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function PasswordChangeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // React Hook Form setup with validation
  const { 
    register, 
    handleSubmit, 
    watch,
    reset,
    formState: { errors } 
  } = useForm();
  
  // Watch new password for confirmation matching
  const newPassword = watch('newPassword', '');
  
  // Form submission handler for password change
  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Password changed successfully');
        setIsSuccess(true);
        reset(); // Clear form
      } else {
        throw new Error(result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Error changing password');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Current Password Field */}
      <div>
        <label htmlFor="currentPassword" className="block text-gray-300 text-sm font-medium mb-2">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          {...register('currentPassword', { 
            required: 'Current password is required',
          })}
          className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
          placeholder="Enter your current password"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>
        )}
      </div>
      
      {/* New Password Field */}
      <div>
        <label htmlFor="newPassword" className="block text-gray-300 text-sm font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          {...register('newPassword', { 
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }
          })}
          className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
          placeholder="Create a new strong password"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
        )}
      </div>
      
      {/* Confirm New Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', { 
            required: 'Please confirm your new password',
            validate: value => value === newPassword || 'Passwords do not match'
          })}
          className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
          placeholder="Confirm your new password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>
      
      {/* Password Requirements Help Text */}
      <div className="bg-[#1A1A1E]/50 rounded p-3 border border-gray-700">
        <p className="text-gray-300 text-sm mb-1">Password must:</p>
        <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
          <li>Be at least 8 characters long</li>
          <li>Include at least one uppercase letter (A-Z)</li>
          <li>Include at least one lowercase letter (a-z)</li>
          <li>Include at least one number (0-9)</li>
          <li>Include at least one special character (@$!%*?&)</li>
        </ul>
      </div>
      
      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-[#FF2247] hover:bg-[#FF2247]/90 text-white font-semibold rounded-lg flex justify-center items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : isSuccess ? 'Password Updated Successfully' : 'Update Password'}
      </motion.button>
    </form>
  );
}
