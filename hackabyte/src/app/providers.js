'use client';

import React, { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }) {
  // Wrap ToastContainer in a client-component that's guaranteed to only run on the client
  // This helps avoid issues with hydration mismatch between server and client
  return (
    <SessionProvider>
      {children}
      <ToastContainerClient />
    </SessionProvider>
  );
}

// Client component for ToastContainer to prevent hydration issues
function ToastContainerClient() {
  // Only render the ToastContainer after the component has mounted on the client
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      closeButton={true}
    />
  );
}
