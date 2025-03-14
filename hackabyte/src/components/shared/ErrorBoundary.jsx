'use client';

import { useState, useEffect } from 'react';
import Container from './Container';

/**
 * Error boundary component that catches runtime errors
 * and displays a user-friendly error message with details
 */
export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create error handler
    const errorHandler = (error) => {
      console.error('Application error:', error);
      setError(error);
      setHasError(true);
    };

    // Add global error handler
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    // Remove handler on cleanup
    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  // Reset error state
  const resetError = () => {
    setHasError(false);
    setError(null);
    
    // Refresh the page to attempt recovery
    window.location.href = '/';
  };

  // If no error, render children normally
  if (!hasError) {
    return children;
  }

  // Render error UI
  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl bg-[#16161A] border border-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
            
            <p className="text-gray-300 mb-6">
              We encountered an error while loading this page. This could be due to a temporary issue or a problem with your connection.
            </p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-900 rounded-lg overflow-auto">
                <p className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                  {error.toString()}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetError}
                className="px-6 py-3 bg-[#FF2247] hover:bg-[#FF3557] text-white font-semibold rounded-lg transition-colors"
              >
                Go to homepage
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
