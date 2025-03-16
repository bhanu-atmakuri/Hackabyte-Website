/**
 * Authentication Form Component
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
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState('available'); // 'available', 'unavailable', 'checking'
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const password = watch('password', '');

  // Check if auth service is available on component mount
  useEffect(() => {
    // Check auth status by making a lightweight request
    const checkAuthStatus = async () => {
      try {
        setAuthStatus('checking');
        const response = await fetch('/api/auth/[...nextauth]/providers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        
        // If response is not OK, auth is unavailable
        if (!response.ok) {
          console.warn('Auth service check failed');
          setAuthStatus('unavailable');
          return;
        }
        
        setAuthStatus('available');
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthStatus('unavailable');
      }
    };
    
    checkAuthStatus();
  }, []);

  // Handle login
  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      
      // If auth is explicitly unavailable, show message and return
      if (authStatus === 'unavailable') {
        toast.error('Authentication service is currently unavailable. Please try again later.');
        return;
      }
      
      // Add defensive error handling for signIn
      let result = null;
      try {
        result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        console.error('SignIn error:', err);
        setAuthStatus('unavailable');
        throw new Error('Authentication service unavailable. Please try again later.');
      }
      
      // Handle undefined result
      if (!result) {
        setAuthStatus('unavailable');
        throw new Error('Authentication service unavailable. Please try again later.');
      }
      
      // Check for error
      if (result.error) {
        // If error indicates server issue, mark auth as unavailable
        if (result.error.includes('server') || result.error.includes('unavailable')) {
          setAuthStatus('unavailable');
        }
        throw new Error(result.error);
      }
      
      // Success - redirect
      setAuthStatus('available'); // Ensure auth status is marked as available
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

  // Retry auth status check
  const retryAuthCheck = async () => {
    toast.info('Checking authentication service...');
    setAuthStatus('checking');
    
    try {
      // Wait a moment before checking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to fetch a basic endpoint to see if auth is back up
      const response = await fetch('/api/auth/[...nextauth]', {
        method: 'HEAD',
        cache: 'no-store',
      });
      
      if (response.ok) {
        setAuthStatus('available');
        toast.success('Authentication service is now available.');
      } else {
        setAuthStatus('unavailable');
        toast.error('Authentication service is still unavailable. Please try again later.');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthStatus('unavailable');
      toast.error('Unable to connect to authentication service.');
    }
  };

  // Handle submission
  const onSubmit = (data) => {
    if (authStatus === 'unavailable') {
      toast.error('Authentication service is currently unavailable. Please try again later.');
      return;
    }
    
    if (mode === 'login') {
      handleLogin(data);
    } else {
      toast.info('Registration is currently being updated. Please try again later.');
    }
  };

  return (
    <Container size="half">
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-8">
          {/* Auth Service Status Banner */}
          {authStatus === 'unavailable' && (
            <div className="mb-6 bg-red-900/30 border border-red-800 rounded-lg p-4 text-white">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>Authentication service unavailable. Please try again later.</p>
              </div>
              <button 
                onClick={retryAuthCheck}
                className="mt-3 bg-red-800 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className="flex mb-8 border-b border-gray-800">
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                mode === 'login' ? 'text-[#FF2247] border-[#FF2247]' : 'text-gray-400 border-transparent'
              }`}
              onClick={() => { setMode('login'); reset(); }}
            >
              Login
            </button>
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                mode === 'register' ? 'text-[#FF2247] border-[#FF2247]' : 'text-gray-400 border-transparent'
              }`}
              onClick={() => { setMode('register'); reset(); }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            
            {/* Email field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full"
                placeholder="name@example.com"
                disabled={authStatus === 'checking'}
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
                {...register('password', { required: 'Password is required' })}
                className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full"
                placeholder="••••••••"
                disabled={authStatus === 'checking'}
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
                  disabled={authStatus === 'checking'}
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                disabled={authStatus === 'checking' || authStatus === 'unavailable'}
                className="text-sm text-[#FF2247] hover:underline disabled:text-gray-500 disabled:no-underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || authStatus === 'checking' || authStatus === 'unavailable'}
              className="w-full btn-primary py-3 mb-4 relative disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 
               authStatus === 'checking' ? 'Checking auth...' :
               authStatus === 'unavailable' ? 'Auth unavailable' :
               (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
            
            {authStatus === 'checking' && (
              <div className="text-center text-sm text-gray-400">
                Checking authentication service status...
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </Container>
  );
}
