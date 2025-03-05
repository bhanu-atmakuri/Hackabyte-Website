'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/register logic here
    console.log(isLogin ? 'Login attempt' : 'Registration attempt', {
      email,
      password,
      name: isLogin ? null : name,
    });
    
    // For demo purposes
    alert(isLogin 
      ? `Login attempt with ${email}` 
      : `Registration attempt for ${name} with ${email}`
    );
  };

  return (
    <div className="container-custom max-w-md mx-auto">
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-8">
          {/* Tabs */}
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

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>

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

            {isLogin && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-primary py-3 mb-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>

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
    </div>
  );
}