import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from 'lib/mongodb';
import Event from 'models/Event';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Get all events
export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const eventId = searchParams.get('eventId');
    
    // If eventId is provided, return a single event
    if (eventId) {
      const event = await Event.findById(eventId);
      
      if (!event) {
        return NextResponse.json({ 
          success: false, 
          message: 'Event not found' 
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: true,
        event
      });
    }
    
    // Otherwise, return events based on filters
    let query = {};
    if (status && ['upcoming', 'ongoing', 'completed'].includes(status)) {
      query.status = status;
    }
    
    const events = await Event.find(query).sort({ startDate: 1 });
    
    return NextResponse.json({
      success: true,
      count: events.length,
      events
    });
    
  } catch (error) {
    console.error('Error fetching events:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching events' 
    }, { status: 500 });
  }
}

// Create a new event (admin only)
export async function POST(req) {
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
    
    const event = await Event.create(body);
    
    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      event
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating event:', error);
    
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
      message: 'Error creating event' 
    }, { status: 500 });
  }
}
