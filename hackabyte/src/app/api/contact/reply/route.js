import dbConnect from '@/app/lib/mongodb';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { sendEmail } from '@/lib/email';

/**
 * POST /api/contact/reply
 * Sends a reply email to a contact message
 */
export async function POST(request) {
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
    const { messageId, replySubject, replyMessage } = body;
    
    if (!messageId || !replySubject || !replyMessage) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields' 
      }, { status: 400 });
    }
    
    await dbConnect();
    const db = mongoose.connection.db;
    const { ObjectId } = require('mongodb');
    
    // Find the original message
    const message = await db.collection('contactMessages').findOne({
      _id: new ObjectId(messageId)
    });
    
    if (!message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Message not found' 
      }, { status: 404 });
    }
    
    // Send the reply email
    await sendEmail({
      to: message.email,
      subject: replySubject,
      text: replyMessage,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Hello ${message.name},</h2>
          <p>${replyMessage.replace(/\n/g, '<br>')}</p>
          <br/>
          <p>Best regards,<br/>The Hackabyte Team</p>
          <hr/>
          <p style="font-size: 12px; color: #666;">
            This is a reply to your message with subject: "${message.subject}"
          </p>
        </div>
      `
    });
    
    // Update message as replied
    await db.collection('contactMessages').updateOne(
      { _id: new ObjectId(messageId) },
      { 
        $set: { 
          replied: true,
          readyBy: session.user.email,
          repliedAt: new Date(),
          reply: {
            subject: replySubject,
            message: replyMessage,
            sentBy: session.user.email,
            sentAt: new Date()
          }
        } 
      }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reply sent successfully' 
    });
    
  } catch (error) {
    console.error('Error sending reply:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending reply'
    }, { status: 500 });
  }
}
