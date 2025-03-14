/**
 * User Model
 * 
 * Defines the schema for user data including personal information,
 * authentication details, and parent/guardian information for minors.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema Definition
 */
const UserSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  school: {
    type: String,
    required: [true, 'School name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [13, 'You must be at least 13 years old'],
    max: [19, 'You must be 19 years or younger'],
  },
  
  // Parent/Guardian Information (required for minors)
  parentName: {
    type: String,
    required: [true, 'Parent/Guardian name is required'],
    trim: true,
  },
  parentPhone: {
    type: String,
    required: [true, 'Parent/Guardian phone is required'],
    trim: true,
  },
  parentEmail: {
    type: String,
    required: [true, 'Parent/Guardian email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  
  // Authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  // System fields
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

/**
 * Pre-save middleware to hash the password before saving to the database
 */
UserSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method to compare password for authentication
 * @param {string} candidatePassword - The password to compare
 * @returns {Promise<boolean>} - Whether the password matches
 */
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the model only if it doesn't exist already (for HMR in development)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
