/**
 * User Dashboard Page
 * 
 * Protected page that displays user information and event registrations:
 * - User profile details
 * - List of registered events
 * - Links to register for upcoming events
 */

import { redirect } from 'next/navigation';
import { getServerSession } from '../../lib/auth/server';

// Import UI components
import UserDashboard from '../../components/dashboard/UserDashboard';

export const metadata = {
  title: 'Dashboard | Hackabyte',
  description: 'View your profile and registered events',
};

/**
 * User dashboard page component
 * Server component that checks authentication and renders dashboard
 */
export default async function DashboardPage() {
  // Check if user is authenticated
  const session = await getServerSession();
  
  // If not authenticated, redirect to login page
  if (!session) {
    redirect('/auth?callbackUrl=/dashboard');
  }
  
  return <UserDashboard session={session} />;
}
