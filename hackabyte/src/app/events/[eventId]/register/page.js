import RegisterPage from '@/components/events/registration/RegisterPage';

// For static export - this function is required for dynamic routes with static export
export async function generateStaticParams() {
  // Return an empty array or hardcoded event IDs for static build
  // In a real app with dynamic content, this would fetch events from an API
  return [
    { eventId: 'event-1' },
    { eventId: 'event-2' }
  ];
}

export default function EventRegister({ params }) {
  const { eventId } = params;
  
  return <RegisterPage eventId={eventId} />;
}
