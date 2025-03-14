/**
 * Event Registration Model
 * 
 * Defines the schema for event registrations, including user information,
 * team preferences, and event-specific details.
 */

import mongoose from 'mongoose';

/**
 * Event Registration Schema Definition
 */
const EventRegistrationSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Event reference (can be linked to your existing events data)
  eventId: {
    type: String,
    required: [true, 'Event ID is required'],
  },
  eventTitle: {
    type: String,
    required: [true, 'Event title is required'],
  },
  
  // Team information
  teamPreference: {
    type: String,
    enum: ['Working alone', 'Looking for team', 'Have a team'],
    required: [true, 'Team preference is required'],
  },
  teamSize: {
    type: Number,
    min: 1,
    max: 4,
  },
  teamMembers: {
    type: String,
    trim: true,
  },
  teamName: {
    type: String,
    trim: true,
  },
  
  // Additional preferences
  dietaryRestrictions: {
    type: String,
    trim: true,
  },
  
  // Discord information
  discordJoined: {
    type: Boolean,
    default: false,
  },
  discordTag: {
    type: String,
    trim: true,
  },
  
  // Experience level
  codingExperience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  
  // Referral information
  referralSource: {
    type: String,
    trim: true,
  },
  
  // Additional information
  questions: {
    type: String,
    trim: true,
  },
  additionalInfo: {
    type: String,
    trim: true,
  },
  
  // System fields
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  confirmationSent: {
    type: Boolean,
    default: false,
  },
  confirmationDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Create the model only if it doesn't exist already (for HMR in development)
const EventRegistration = mongoose.models.EventRegistration || 
                        mongoose.model('EventRegistration', EventRegistrationSchema);

export default EventRegistration;
