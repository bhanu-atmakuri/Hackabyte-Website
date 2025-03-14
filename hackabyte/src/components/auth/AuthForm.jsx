/**
 * Authentication Form Component
 * 
 * A dual-purpose form that handles both user login and registration with:
 * - Tab-based toggle between login and registration views
 * - Form validation for required fields
 * - Responsive design that works across screen sizes
 * - Backend integration with NextAuth.js and our custom API endpoints
 * - Complete user profile collection during registration
 * - Password recovery functionality
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from '../shared/Container';

export default function AuthForm() {
  const router = useRouter();
  
  // State for toggling between login, registration, and forgot password modes
  const [mode, setMode] = useState('login'); // 'login', 'register', or 'forgot'
  const [isLoading, setIsLoading] = useState(false);
  
  // React Hook Form setup
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const password = watch('password', '');
  
  /**
   * Handle registration form submission
   * Collects all user data and sends to the API
   */
  const handleRegister = async (data) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          school: data.school,
          age: parseInt(data.age),
          parentName: data.parentName,
          parentPhone: data.parentPhone,
          parentEmail: data.parentEmail,
          dietaryRestrictions: data.dietaryRestrictions
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
      
      // Show success message
      toast.success('Registration successful! You can now log in.');
      
      // Reset form and switch to login mode
      reset();
      setMode('login');
      
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle login form submission
   * Uses NextAuth.js for authentication
   */
  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      
      if (result.error) {
        throw new Error(result.error || 'Invalid email or password');
      }
      
      // Redirect to dashboard or home page on successful login
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1500);
      
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle forgot password form submission
   * Sends password reset email
   */
  const handleForgotPassword = async (data) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send reset email');
      }
      
      // Show success message regardless of whether email exists for security
      toast.success('If an account with that email exists, a password reset link has been sent.');
      
      // Reset form and switch back to login mode
      reset();
      setMode('login');
      
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Form submission handler that routes to the appropriate handler
  const onSubmit = (data) => {
    if (mode === 'register') {
      handleRegister(data);
    } else if (mode === 'login') {
      handleLogin(data);
    } else if (mode === 'forgot') {
      handleForgotPassword(data);
    }
  };

  return (
    <Container size="half">
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-8">
          {/* Authentication mode toggle tabs */}
          <div className="flex mb-8 border-b border-gray-800">
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                mode === 'login'
                  ? 'text-[#FF2247] border-[#FF2247]'
                  : 'text-gray-400 border-transparent hover:text-white'
              } transition-colors`}
              onClick={() => {
                setMode('login');
                reset();
              }}
            >
              Login
            </button>
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                mode === 'register'
                  ? 'text-[#FF2247] border-[#FF2247]'
                  : 'text-gray-400 border-transparent hover:text-white'
              } transition-colors`}
              onClick={() => {
                setMode('register');
                reset();
              }}
            >
              Register
            </button>
          </div>

          {/* Form with fade-in animation */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {mode === 'login' 
                ? 'Sign in to your account' 
                : mode === 'register' 
                  ? 'Create a new account' 
                  : 'Reset your password'
              }
            </h2>
            
            {/* LOGIN MODE FIELDS */}
            {mode === 'login' && (
              <>
                {/* Email field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password field */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password', { 
                      required: 'Password is required'
                    })}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* "Remember me" and "Forgot password" */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      {...register('remember')}
                      className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      reset();
                    }}
                    className="text-sm text-[#FF2247] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            )}
            
            {/* REGISTER MODE FIELDS */}
            {mode === 'register' && (
              <>
                {/* Basic Info Section */}
                <div className="mb-6 pb-4 border-b border-gray-800">
                  <h3 className="text-white text-lg font-medium mb-4">Basic Information</h3>
                
                  {/* Full Name */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { 
                        required: 'Full name is required' 
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="registerEmail" className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="registerEmail"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="name@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* School */}
                  <div className="mb-4">
                    <label htmlFor="school" className="block text-gray-300 text-sm font-medium mb-2">
                      School
                    </label>
                    <input
                      type="text"
                      id="school"
                      {...register('school', { 
                        required: 'School name is required' 
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="Your school name"
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
                      {...register('age', { 
                        required: 'Age is required'
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    >
                      <option value="">Select your age</option>
                      {[13, 14, 15, 16, 17, 18, 19].map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                    {errors.age && (
                      <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-medium mb-2">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      {...register('phoneNumber')}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                {/* Parent/Guardian Section */}
                <div className="mb-6 pb-4 border-b border-gray-800">
                  <h3 className="text-white text-lg font-medium mb-4">Parent/Guardian Information</h3>

                  {/* Parent Name */}
                  <div className="mb-4">
                    <label htmlFor="parentName" className="block text-gray-300 text-sm font-medium mb-2">
                      Parent/Guardian Full Name
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      {...register('parentName', { 
                        required: 'Parent/Guardian name is required' 
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="Parent/Guardian name"
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
                      {...register('parentPhone', { 
                        required: 'Parent/Guardian phone is required' 
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="(123) 456-7890"
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
                        required: 'Parent/Guardian email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="parent@example.com"
                    />
                    {errors.parentEmail && (
                      <p className="text-red-500 text-xs mt-1">{errors.parentEmail.message}</p>
                    )}
                  </div>
                </div>

                {/* Additional Info Section */}
                <div className="mb-6 pb-4 border-b border-gray-800">
                  <h3 className="text-white text-lg font-medium mb-4">Additional Information</h3>

                  {/* Dietary Restrictions */}
                  <div className="mb-4">
                    <label htmlFor="dietaryRestrictions" className="block text-gray-300 text-sm font-medium mb-2">
                      Dietary Restrictions (optional)
                    </label>
                    <textarea
                      id="dietaryRestrictions"
                      {...register('dietaryRestrictions')}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="Please specify any dietary restrictions or allergies"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                {/* Password Section */}
                <div className="mb-6">
                  <h3 className="text-white text-lg font-medium mb-4">Account Security</h3>

                  {/* Password */}
                  <div className="mb-4">
                    <label htmlFor="registerPassword" className="block text-gray-300 text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="registerPassword"
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match'
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {/* FORGOT PASSWORD MODE FIELDS */}
            {mode === 'forgot' && (
              <div className="mb-6">
                <p className="text-gray-300 mb-4">
                  Enter your email address below, and we'll send you a link to reset your password.
                </p>
                <label htmlFor="forgotEmail" className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="forgotEmail"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
            )}

            {/* Submit button with hover/tap animations */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 mb-4 relative"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                mode === 'login' 
                  ? 'Sign In' 
                  : mode === 'register' 
                    ? 'Create Account' 
                    : 'Send Reset Link'
              )}
            </motion.button>

            {/* Mode toggle links */}
            <div className="text-center text-gray-400 text-sm">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      reset();
                    }}
                    className="text-[#FF2247] hover:underline"
                  >
                    Sign up now
                  </button>
                </>
              ) : mode === 'register' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      reset();
                    }}
                    className="text-[#FF2247] hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      reset();
                    }}
                    className="text-[#FF2247] hover:underline"
                  >
                    Back to login
                  </button>
                </>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </Container>
  );
}
