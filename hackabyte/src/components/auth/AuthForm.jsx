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

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import Container from '../shared/Container';

export default function AuthForm() {
  const router = useRouter();
  
  // State for toggling between login, registration, and forgot password modes
  const [mode, setMode] = useState('login'); // 'login', 'register', or 'forgot'
  const [isLoading, setIsLoading] = useState(false);
  
  // React Hook Form setup
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
  const password = watch('password', '');
  const dateOfBirth = watch('dateOfBirth', '');
  
  // State to track calculated age
  const [calculatedAge, setCalculatedAge] = useState(null);
  const [isOver18, setIsOver18] = useState(false);
  
  // Calculate age based on date of birth
  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // If birthday hasn't occurred yet this year, subtract one year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setCalculatedAge(age);
      setIsOver18(age >= 18);
    }
  }, [dateOfBirth]);
  
  /**
   * Handle registration form submission
   * Collects all user data and sends to the API
   */
  const handleRegister = async (data) => {
    try {
      setIsLoading(true);
      
      // Prepare registration data
      const registrationData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        school: data.school,
        dateOfBirth: data.dateOfBirth,
        discordUsername: data.discordUsername,
        age: calculatedAge > 19 ? 19 : calculatedAge  // Cap age at 19 for database constraint
      };
      
      // Include parent info (with default values if user is 18 or older)
      if (calculatedAge < 18) {
        registrationData.parentName = data.parentName;
        registrationData.parentPhone = data.parentPhone;
        registrationData.parentEmail = data.parentEmail;
      } else {
        // Default values for users 18 and older
        registrationData.parentName = "N/A";
        registrationData.parentPhone = "N/A";
        registrationData.parentEmail = "N/A@notapplicable.com"; // Valid email format for validation
      }
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle validation errors specifically
        if (result.errors && Array.isArray(result.errors)) {
          // Display each validation error as a separate toast
          result.errors.forEach(error => toast.error(error));
          // Don't throw error after showing validation messages
          setIsLoading(false);
          return; // Exit function without throwing error
        } else {
          throw new Error(result.message || 'Registration failed');
        }
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
      
      // Fetch user data to determine role-based redirection
      const userResponse = await fetch('/api/user');
      const userData = await userResponse.json();
      
      if (!userData.success) {
        throw new Error('Could not retrieve user information');
      }
      
      // Determine redirect path based on user role
      const redirectPath = userData.user.role === 'admin' ? '/admin' : '/dashboard';
      
      // Redirect based on user role
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        router.push(redirectPath);
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

                  {/* Date of Birth */}
                  <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-gray-300 text-sm font-medium mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      max={new Date().toISOString().split('T')[0]} // Prevent future dates
                      min="1900-01-01" // Set minimum date to allow older ages
                      {...register('dateOfBirth', { 
                        required: 'Date of birth is required',
                        validate: value => {
                          // Check if date is in the past
                          const selected = new Date(value);
                          return selected < new Date() || 'Date must be in the past';
                        }
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      style={{ colorScheme: 'dark' }}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
                    )}
                    {calculatedAge !== null && (
                      <p className="text-gray-400 text-xs mt-1">
                        Age: {calculatedAge} years old
                        {calculatedAge < 18 && (
                          <span className="text-[#FF2247] ml-2">
                            (Parent/Guardian information required below)
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Discord Username */}
                  <div className="mb-4">
                    <label htmlFor="discordUsername" className="block text-gray-300 text-sm font-medium mb-2">
                      Discord Username
                    </label>
                    <input
                      type="text"
                      id="discordUsername"
                      {...register('discordUsername')}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="username#0000"
                    />
                    <div className="flex items-center mt-2">
                      <svg className="h-4 w-4 text-[#FF2247] mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3864-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"></path>
                      </svg>
                      <a href="https://discord.gg/drXX4sZmbX" target="_blank" rel="noopener noreferrer" className="text-[#FF2247] text-xs hover:underline">
                        Join our Discord server
                      </a>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                      We use Discord for event communication and hackathon updates
                    </p>
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

                {/* Parent/Guardian Section - always there but conditionally shown */}
                <div className={`mb-6 pb-4 border-b border-gray-800 ${calculatedAge !== null && calculatedAge < 18 ? '' : 'hidden'}`}>
                  <h3 className="text-white text-lg font-medium mb-4">Parent/Guardian Information</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Since you are under 18, we need parent/guardian information
                  </p>

                  {/* Parent Name */}
                  <div className="mb-4">
                    <label htmlFor="parentName" className="block text-gray-300 text-sm font-medium mb-2">
                      Parent/Guardian Full Name
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      {...register('parentName', { 
                        required: calculatedAge < 18 ? 'Parent/Guardian name is required' : false
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
                        required: calculatedAge < 18 ? 'Parent/Guardian phone is required' : false
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
                        required: calculatedAge < 18 ? 'Parent/Guardian email is required' : false,
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

                {/* There used to be an Additional Info section here, but dietary restrictions have been moved to event registration */}

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
