import dbConnect from '@/app/lib/mongodb';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { createToken } from '@/app/api/auth/utils';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

/**
 * POST /api/contact
 * Creates a new contact message in the database
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields' 
      }, { status: 400 });
    }
    
    await dbConnect();
    const db = mongoose.connection.db;
    
    // Create new contact message
    const contactMessage = {
      name,
      email,
      subject,
      message,
      read: false,
      replied: false,
      createdAt: new Date(),
    };
    
    await db.collection('contactMessages').insertOne(contactMessage);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact message sent successfully' 
    });
    
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending contact message'
    }, { status: 500 });
  }
}

/**
 * GET /api/contact
 * Fetches all contact messages (admin only)
 */
export async function GET(request) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized' 
      }, { status: 403 });
    }
    
    await dbConnect();
    const db = mongoose.connection.db;
    
    // Get messages sorted by creation date (newest first)
    const messages = await db.collection('contactMessages')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      messages 
    });
    
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching contact messages'
    }, { status: 500 });
  }
}

/**
 * PUT /api/contact
 * Updates a contact message (mark as read/replied)
 */
export async function PUT(request) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized' 
      }, { status: 403 });
    }
    
    const body = await request.json();
    const { messageId, read, replied } = body;
    
    if (!messageId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Message ID is required' 
      }, { status: 400 });
    }
    
    await dbConnect();
    const db = mongoose.connection.db;
    const { ObjectId } = require('mongodb');
    
    const updateData = {};
    if (read !== undefined) updateData.read = read;
    if (replied !== undefined) updateData.replied = replied;
    
    const result = await db.collection('contactMessages').updateOne(
      { _id: new ObjectId(messageId) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Message not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message updated successfully' 
    });
    
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error updating message'
    }, { status: 500 });
  }
}
