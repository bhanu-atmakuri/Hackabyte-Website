import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from 'lib/mongodb';
import Event from 'models/Event';
import EventRegistration from 'models/EventRegistration';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Get all events with registration stats (admin only)
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    
    // If eventId is provided, get a specific event with registration details
    if (eventId) {
      const event = await Event.findById(eventId);
      
      if (!event) {
        return NextResponse.json(
          { success: false, message: 'Event not found' },
          { status: 404 }
        );
      }
      
      // Get registrations for this event
      const registrations = await EventRegistration.find({ event: eventId })
        .populate('user', 'name email phoneNumber school age parentName parentPhone parentEmail')
        .sort({ createdAt: -1 });
      
      return NextResponse.json({
        success: true,
        event,
        registrations,
        registrationCount: registrations.length
      });
    }
    
    // Otherwise, get all events with registration counts
    const events = await Event.find().sort({ startDate: 1 });
    
    // Get registration counts for each event
    const eventsWithStats = await Promise.all(events.map(async (event) => {
      const registrationCount = await EventRegistration.countDocuments({ event: event._id });
      return {
        ...event.toObject(),
        registrationCount
      };
    }));
    
    return NextResponse.json({
      success: true,
      count: events.length,
      events: eventsWithStats
    });
    
  } catch (error) {
    console.error('Error fetching events:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching events' 
    }, { status: 500 });
  }
}

// Update an event (admin only)
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { eventId, ...updateData } = body;
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    const event = await Event.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      event
    });
    
  } catch (error) {
    console.error('Error updating event:', error);
    
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
      message: 'Error updating event' 
    }, { status: 500 });
  }
}

// Delete an event (admin only)
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }
    
    // First delete all registrations for this event
    await EventRegistration.deleteMany({ event: eventId });
    
    // Then delete the event
    const event = await Event.findByIdAndDelete(eventId);
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Event and all registrations deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting event:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error deleting event' 
    }, { status: 500 });
  }
}
