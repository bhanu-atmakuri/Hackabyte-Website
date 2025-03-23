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
 * - Admin authentication support with redirection to admin console
 * - Priority logic: if user exists in both users and admins database, admin access is prioritized
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import { db } from '../../app/firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  // Router for page navigation
  const router = useRouter();
  
  // State for toggling between login and registration modes
  const [isLogin, setIsLogin] = useState(true);
  
  // Form field states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  /**
   * Check if user is an admin
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{isAdmin: boolean, adminId: string|null}>}
   */
  const checkAdminCredentials = async (email, password) => {
    try {
      // Query Firestore for admin user with matching email
      const adminRef = collection(db, 'admins');
      const q = query(adminRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return { isAdmin: false, adminId: null };
      }

      // Check password
      const adminDoc = querySnapshot.docs[0];
      const adminData = adminDoc.data();

      // In a real app, you should never store plain passwords
      // This is just for demonstration - you should use proper authentication
      if (adminData.password !== password) {
        return { isAdmin: false, adminId: null };
      }

      return { isAdmin: true, adminId: adminDoc.id };
    } catch (error) {
      console.error("Error checking admin credentials:", error);
      return { isAdmin: false, adminId: null };
    }
  };

  /**
   * Form submission handler
   * Handles both regular user authentication and admin authentication
   * Routes both user types to admin page as requested
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login mode
        // First, check if these are admin credentials
        const { isAdmin, adminId } = await checkAdminCredentials(email, password);
        
        if (isAdmin) {
          // Admin credentials are valid
          // Set admin session
          sessionStorage.setItem('adminLoggedIn', 'true');
          sessionStorage.setItem('adminEmail', email);
          sessionStorage.setItem('adminId', adminId);
          
          // Set admin cookie with expiration (7 days)
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          document.cookie = `admin_token=${adminId}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
          
          // Redirect to admin home
          router.push('/admin');
          return;
        }
        
        // If we get here, the user is not an admin
        // Regular user login logic would go here
        console.log('Regular user login attempt', { email, password });
        
        // Set regular user session
        sessionStorage.setItem('userLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        
        // Alert for demo purposes
        alert(`Login successful for: ${email}`);
        
        // Redirect to admin page as requested (Note: This could create security issues)
        router.push('/admin');
      } else {
        // Registration mode
        // Validate passwords match
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        // Registration logic would go here
        console.log('Registration attempt', { name, email, password });
        alert(`Account created for: ${name} (${email})`);
        
        // After successful registration, log the user in
        sessionStorage.setItem('userLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        
        // Redirect to admin page as requested
        router.push('/admin');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size='half'>
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
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                !isLogin
                  ? 'text-[#FF2247] border-[#FF2247]'
                  : 'text-gray-400 border-transparent hover:text-white'
              } transition-colors`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Form with fade-in animation */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 text-red-400 rounded-lg text-sm border border-red-800">
                {error}
              </div>
            )}

            {/* Conditional name field - only shown in registration mode */}
            {!isLogin && (
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* Email field - required in both modes */}
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
              />
            </div>

            {/* Password field - required in both modes */}
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
              />
            </div>

            {/* Conditional password confirmation - only shown in registration mode */}
            {!isLogin && (
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Conditional "Remember me" and "Forgot password" - only shown in login mode */}
            {isLogin && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[#FF2247] hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit button with hover/tap animations */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 mb-4 disabled:opacity-70"
            >
              {loading 
                ? (isLogin ? 'Signing in...' : 'Creating account...')
                : (isLogin ? 'Sign In' : 'Create Account')
              }
            </motion.button>

            {/* Mode toggle link - changes text based on current mode */}
            <div className="text-center text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#FF2247] hover:underline"
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