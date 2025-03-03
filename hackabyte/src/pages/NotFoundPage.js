import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-hackabyte-dark px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-hackabyte-red mb-4">404</h1>
          <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-400 mb-8">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary py-3 px-8 text-lg">
            Go Home
          </Link>
          <Link to="/events" className="bg-hackabyte-gray text-white py-3 px-8 rounded-full font-medium hover:bg-gray-700 transition-colors text-lg">
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;