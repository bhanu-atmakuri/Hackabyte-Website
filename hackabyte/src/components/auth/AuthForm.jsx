/**
 * Authentication Form Component
 * 
 * A dual-purpose form that handles both user login and registration with:
 * - Tab-based toggle between login and registration views
 * - Form validation for required fields
 * - Responsive design that works across screen sizes
 * - Smooth transitions between form states
 * - Password confirmation for registration
 * - "Remember me" option for login
 * - Additional fields for registration based on Google form requirements
 * - Integration with backend APIs
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '../shared/Container';

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  
  // If already logged in, redirect to dashboard
  if (status === 'authenticated') {
    router.push('/dashboard');
    return null;
  }
  
  // Check for success/error messages from URL
  const verified = searchParams.get('verified') === 'true';
  const error = searchParams.get('error');
  
  // State for toggling between login and registration modes
  const [isLogin, setIsLogin] = useState(true);
  
  // Form status
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  // Login form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Registration form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [school, setSchool] = useState('');
  const [age, setAge] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Password reset form fields
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  
  /**
   * Handle login form submission
   * @param {Event} e - Form submission event
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: loginEmail,
        password: loginPassword,
      });
      
      if (result.error) {
        setFormError(result.error);
      } else {
        // Redirect to dashboard on successful login
        router.push('/dashboard');
      }
    } catch (error) {
      setFormError('An error occurred during login. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle registration form submission
   * @param {Event} e - Form submission event
   */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          school,
          age: parseInt(age, 10),
          parentName,
          parentPhone,
          parentEmail,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setFormError(data.message || 'Registration failed. Please try again.');
      } else {
        setFormSuccess('Registration successful! Please check your email to verify your account.');
        // Clear form
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setSchool('');
        setAge('');
        setParentName('');
        setParentPhone('');
        setParentEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setFormError('An error occurred during registration. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle password reset request submission
   * @param {Event} e - Form submission event
   */
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: resetEmail,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setFormError(data.message || 'Password reset request failed. Please try again.');
      } else {
        setFormSuccess('If your email is registered, you will receive a password reset link shortly.');
        setResetEmail('');
      }
    } catch (error) {
      setFormError('An error occurred during password reset request. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // If in password reset mode, show password reset form
  if (isForgotPassword) {
    return (
      <Container size="half">
        <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
          <div className="p-8">
            <button
              onClick={() => setIsForgotPassword(false)}
              className="mb-6 flex items-center text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to login
            </button>
            
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleResetSubmit}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Reset Your Password</h2>
              
              {formError && (
                <div className="mb-6 p-3 bg-red-900/20 border border-red-900 rounded-lg text-red-400">
                  {formError}
                </div>
              )}
              
              {formSuccess && (
                <div className="mb-6 p-3 bg-green-900/20 border border-green-900 rounded-lg text-green-400">
                  {formSuccess}
                </div>
              )}
              
              <p className="text-gray-300 mb-6">
                Enter your email address below and we'll send you a link to reset your password.
              </p>
              
              <div className="mb-6">
                <label htmlFor="resetEmail" className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary py-3 mb-4"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Send Reset Link'}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </Container>
    );
  }
  
  return (
    <Container size="half">
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-8">
          {/* Authentication mode toggle tabs */}
          <div className="flex mb-8 border-b border-gray-800">
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                isLogin
                  ? 'text-[#FF2247] border-[#FF2247]'
                  : 'text-gray-400 border-transparent hover:text-white'
              } transition-colors`}
              onClick={() => {
                setIsLogin(true);
                setFormError('');
                setFormSuccess('');
              }}
            >
              Login
            </button>
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                !isLogin
                  ? 'text-[#FF2247] border-[#FF2247]'
                  : 'text-gray-400 border-transparent hover:text-white'
              } transition-colors`}
              onClick={() => {
                setIsLogin(false);
                setFormError('');
                setFormSuccess('');
              }}
            >
              Register
            </button>
          </div>

          {/* Display any authentication related messages */}
          {verified && (
            <div className="mb-6 p-3 bg-green-900/20 border border-green-900 rounded-lg text-green-400">
              Your email has been verified! You can now log in.
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-900 rounded-lg text-red-400">
              {error === 'missing_token' && 'Missing verification token.'}
              {error === 'invalid_token' && 'Invalid verification token.'}
              {error === 'server_error' && 'A server error occurred during verification.'}
              {!['missing_token', 'invalid_token', 'server_error'].includes(error) && 'An error occurred.'}
            </div>
          )}
          
          {formError && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-900 rounded-lg text-red-400">
              {formError}
            </div>
          )}
          
          {formSuccess && (
            <div className="mb-6 p-3 bg-green-900/20 border border-green-900 rounded-lg text-green-400">
              {formSuccess}
            </div>
          )}

          {/* Form with fade-in animation */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>

            {isLogin ? (
              // Login Form Fields
              <>
                <div className="mb-6">
                  <label htmlFor="loginEmail" className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="name@example.com"
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="loginPassword" className="block text-gray-300 text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                      disabled={isLoading}
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setFormError('');
                      setFormSuccess('');
                    }}
                    className="text-sm text-[#FF2247] hover:underline"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            ) : (
              // Registration Form Fields
              <>
                {/* Personal Information */}
                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="name@example.com"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-medium mb-2">
                    Phone Number <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="(555) 123-4567"
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-xs text-gray-500">For emergency purposes only</p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="school" className="block text-gray-300 text-sm font-medium mb-2">
                    School
                  </label>
                  <input
                    type="text"
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="Hackabyte High School"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="age" className="block text-gray-300 text-sm font-medium mb-2">
                    Age
                  </label>
                  <select
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    disabled={isLoading}
                  >
                    <option value="">Select your age</option>
                    {[13, 14, 15, 16, 17, 18, 19].map((age) => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">You must be 13-19 years old to participate</p>
                </div>
                
                {/* Parent/Guardian Information */}
                <div className="mt-8 mb-4">
                  <h3 className="text-lg font-semibold text-white">Parent/Guardian Information</h3>
                  <p className="text-gray-400 text-sm">Required for all participants</p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="parentName" className="block text-gray-300 text-sm font-medium mb-2">
                    Parent/Guardian Full Name
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="Jane Doe"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="parentPhone" className="block text-gray-300 text-sm font-medium mb-2">
                    Parent/Guardian Phone Number
                  </label>
                  <input
                    type="tel"
                    id="parentPhone"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="(555) 123-4567"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="parentEmail" className="block text-gray-300 text-sm font-medium mb-2">
                    Parent/Guardian Email
                  </label>
                  <input
                    type="email"
                    id="parentEmail"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="parent@example.com"
                    disabled={isLoading}
                  />
                </div>
                
                {/* Authentication Fields */}
                <div className="mt-8 mb-4">
                  <h3 className="text-lg font-semibold text-white">Account Security</h3>
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="••••••••"
                    minLength={8}
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            {/* Submit button with hover/tap animations */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-primary py-3 mb-4"
              disabled={isLoading}
            >
              {isLoading 
                ? 'Processing...' 
                : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>

            {/* Mode toggle link - changes text based on current mode */}
            <div className="text-center text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormError('');
                  setFormSuccess('');
                }}
                className="text-[#FF2247] hover:underline"
                disabled={isLoading}
              >
                {isLogin ? 'Sign up now' : 'Sign in'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </Container>
  );
}
