import Link from 'next/link';
import Container from '../components/shared/Container';

/**
 * Custom 404 Not Found Page
 * 
 * This page is shown when a user navigates to a route that doesn't exist
 */
export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-[#FF2247]">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          
          <p className="text-gray-300 mb-8 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-[#FF2247] hover:bg-[#FF3557] text-white font-semibold rounded-lg transition-colors"
            >
              Go to Homepage
            </Link>
            
            <Link 
              href="/events"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
