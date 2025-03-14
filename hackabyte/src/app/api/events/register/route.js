/**
 * Event Registration API Route
 * 
 * Handles event registration process:
 * - Validates user is authenticated
 * - Creates new event registration
 * - Sends confirmation email
 * - Returns appropriate response
 */

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from '../../../../lib/auth/server';
import connectDB from '../../../../lib/db/mongoose';
import User from '../../../../lib/models/User';
import EventRegistration from '../../../../lib/models/EventRegistration';
import { upcomingEvents } from '../../../../lib/data/upcomingEvents';
import { sendEventRegistrationEmail } from '../../../../lib/email/emailService';

/**
 * POST handler for event registration
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response
 */
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { 
      eventId,
      teamPreference,
      teamSize,
      teamMembers,
      teamName,
      dietaryRestrictions,
      discordJoined,
      discordTag,
      codingExperience,
      referralSource,
      questions,
      additionalInfo
    } = await request.json();
    
    // Validate required fields
    if (!eventId || !teamPreference) {
      return NextResponse.json(
        { message: 'EventId and teamPreference are required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Find user from session
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Find event from local data
    const event = upcomingEvents.find(e => e.title === eventId);
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Check if user is already registered for this event
    const existingRegistration = await EventRegistration.findOne({
      userId: user._id,
      eventId
    });
    
    if (existingRegistration) {
      return NextResponse.json(
        { message: 'You are already registered for this event' },
        { status: 409 }
      );
    }
    
    // Create new event registration
    const registration = new EventRegistration({
      userId: user._id,
      eventId,
      eventTitle: event.title,
      teamPreference,
      teamSize,
      teamMembers,
      teamName,
      dietaryRestrictions,
      discordJoined,
      discordTag,
      codingExperience,
      referralSource,
      questions,
      additionalInfo,
      registrationDate: new Date(),
      isConfirmed: true,
      confirmationSent: false
    });
    
    await registration.save();
    
    // Send confirmation email
    await sendEventRegistrationEmail(
      user.email,
      user.fullName,
      event,
      {
        teamPreference,
        teamName,
        teamMembers,
        dietaryRestrictions
      }
    );
    
    // Update registration confirmation status
    registration.confirmationSent = true;
    registration.confirmationDate = new Date();
    await registration.save();
    
    return NextResponse.json(
      { 
        message: 'Registration successful',
        registration: {
          id: registration._id,
          eventTitle: event.title,
          registrationDate: registration.registrationDate
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Event registration error:', error);
    
    return NextResponse.json(
      { message: 'Failed to register for event', error: error.message },
      { status: 500 }
    );
  }
}
