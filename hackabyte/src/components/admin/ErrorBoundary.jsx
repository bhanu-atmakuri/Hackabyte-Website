'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AdminErrorHandler({ children }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  if (hasError) {
    return (
      <div className="min-h-screen bg-[#1A1A1E] flex flex-col items-center justify-center p-6">
        <div className="bg-[#16161A] rounded-xl p-8 border border-gray-800 max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{errorMessage || "We're having trouble loading this page. Please try again."}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#FF2247] text-white rounded-md hover:bg-[#ff3357] transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary 
      onError={(error) => {
        console.error('Admin UI Error:', error);
        setErrorMessage(error.message);
        setHasError(true);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return null; // Parent component will handle rendering
    }

    return this.props.children;
  }
}
