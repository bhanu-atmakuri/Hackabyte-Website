/**
 * User Registrations API Route
 * 
 * Handles fetching current user's event registrations:
 * - Validates authentication
 * - Retrieves registration data from database
 * - Returns formatted registration data with event details
 */

import { NextResponse } from 'next/server';
import { getServerSession } from '../../../../../lib/auth/server';
import connectDB from '../../../../../lib/db/mongoose';
import EventRegistration from '../../../../../lib/models/EventRegistration';
import { upcomingEvents } from '../../../../../lib/data/upcomingEvents';

/**
 * GET handler for fetching current user's event registrations
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response with registration data
 */
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Find user registrations
    const registrations = await EventRegistration.find({ userId: session.user.id })
      .sort({ registrationDate: -1 }); // Sort by registration date, newest first
    
    // Format registrations with event details
    const formattedRegistrations = registrations.map(registration => {
      // Find event details from upcomingEvents
      const eventDetails = upcomingEvents.find(event => event.title === registration.eventId) || {};
      
      return {
        id: registration._id.toString(),
        eventId: registration.eventId,
        eventTitle: registration.eventTitle,
        eventDate: eventDetails.date || 'Unknown',
        eventLocation: eventDetails.location || 'Unknown',
        registrationDate: registration.registrationDate,
        teamPreference: registration.teamPreference,
        teamSize: registration.teamSize,
        teamName: registration.teamName,
        teamMembers: registration.teamMembers,
        dietaryRestrictions: registration.dietaryRestrictions,
        discordJoined: registration.discordJoined,
        discordTag: registration.discordTag,
        codingExperience: registration.codingExperience,
        confirmationSent: registration.confirmationSent,
        confirmationDate: registration.confirmationDate,
      };
    });
    
    return NextResponse.json(formattedRegistrations, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    
    return NextResponse.json(
      { message: 'Failed to fetch user registrations', error: error.message },
      { status: 500 }
    );
  }
}
