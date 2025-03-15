// This is a placeholder page for the event detail route
// For static export with dynamic routes, we need generateStaticParams

// For static export - this function is required for dynamic routes with static export
export async function generateStaticParams() {
  // Return an empty array or hardcoded event IDs for static build
  // In a real app with dynamic content, this would fetch events from an API
  return [
    { eventId: 'event-1' },
    { eventId: 'event-2' }
  ];
}

// The main page component would normally display event details
// For now, we'll just redirect to the events page
export default function EventPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1E] text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Event not found</h1>
        <p className="mb-6">The event you are looking for may not exist or has been removed.</p>
        <a 
          href="/events" 
          className="bg-[#FF2247] hover:bg-[#E01F3F] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          View All Events
        </a>
      </div>
    </div>
  );
}
