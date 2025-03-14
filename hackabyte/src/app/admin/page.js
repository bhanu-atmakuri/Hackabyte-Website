/**
 * Admin Dashboard Page
 * 
 * Protected page that displays administrative interface:
 * - User management
 * - Event registration management
 * - Data export functionality
 * 
 * Only accessible to users with admin role
 */

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth/auth';

// Import UI components
import AdminDashboard from '../../components/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard | Hackabyte',
  description: 'Administrative interface for managing users and registrations',
};

/**
 * Admin dashboard page component
 * Server component that checks admin authentication and renders dashboard
 */
export default async function AdminPage() {
  // Check if user is authenticated and has admin role
  const session = await getServerSession(authOptions);
  
  // If not authenticated, redirect to login page
  if (!session) {
    redirect('/auth?callbackUrl=/admin');
  }
  
  // If not admin, redirect to dashboard
  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }
  
  return <AdminDashboard session={session} />;
}
