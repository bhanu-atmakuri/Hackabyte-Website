/**
 * Event Registration Page
 * 
 * This page handles event-specific registration:
 * - Receives event ID from URL query parameters
 * - Renders event registration form
 * - Protected route requiring authentication
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react.js';
import { redirect } from 'next/navigation';
import EventRegistrationForm from '../../../components/events/EventRegistrationForm';
import Container from '../../../components/shared/Container';

export default function EventRegistrationPage() {
  const searchParams = useSearchParams();
  const { status } = useSession();
  
  // Get event ID from URL query parameters
  const eventId = searchParams.get('eventId');
  
  // Redirect to events page if no event ID provided
  if (!eventId) {
    redirect('/events');
  }
  
  // If not authenticated, redirect to login
  if (status === 'unauthenticated') {
    redirect(`/auth?callbackUrl=${encodeURIComponent(`/events/register?eventId=${eventId}`)}`);
  }
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF2247]"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </Container>
    );
  }
  
  // Render event registration form once authenticated
  return <EventRegistrationForm eventId={eventId} />;
}
