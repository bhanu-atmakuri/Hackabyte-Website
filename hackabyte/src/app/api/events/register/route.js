import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Event from '@/models/Event';
import EventRegistration from '@/models/EventRegistration';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sendEventRegistrationEmail } from '@/lib/email';

// Register for an event
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { 
      eventId, 
      hasTeam, 
      teamSize, 
      teamMemberNames, 
      teamName, 
      needsTeam,
      discordTag,
      experience,
      referralSource,
      questions,
      additionalInfo
    } = body;
    
    // Verify that the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Check if the user has already registered for this event
    const existingRegistration = await EventRegistration.findOne({
      user: session.user.id,
      event: eventId
    });
    
    if (existingRegistration) {
      return NextResponse.json(
        { success: false, message: 'You have already registered for this event' },
        { status: 409 }
      );
    }
    
    // Create new registration
    const registration = await EventRegistration.create({
      user: session.user.id,
      event: eventId,
      hasTeam,
      teamSize,
      teamMemberNames,
      teamName,
      needsTeam,
      discordTag,
      experience,
      referralSource,
      questions,
      additionalInfo
    });
    
    // Get user details for email
    const user = await User.findById(session.user.id);
    
    // Send confirmation email
    await sendEventRegistrationEmail(user, event);
    
    return NextResponse.json({
      success: true,
      message: 'Successfully registered for the event',
      registration: {
        id: registration._id,
        eventName: event.name,
        status: registration.status
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ 
        success: false, 
        message: 'Validation failed', 
        errors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error registering for event' 
    }, { status: 500 });
  }
}

// Get user's event registrations
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    // Find all registrations for the current user and populate event details
    const registrations = await EventRegistration.find({ user: session.user.id })
      .populate('event')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: registrations.length,
      registrations
    });
    
  } catch (error) {
    console.error('Error fetching registrations:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching registrations' 
    }, { status: 500 });
  }
}
