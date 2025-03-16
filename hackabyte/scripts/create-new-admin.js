// Script to create a new admin user
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Setup file paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env.local') });

// Import User model
import User from '../models/User.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Current date for calculating date of birth
    const today = new Date();
    const birthDate = new Date(today);
    birthDate.setFullYear(today.getFullYear() - 19); // Set to 19 years old (max allowed)
    
    // Admin user data with unique email to avoid conflicts
    const adminData = {
      name: 'New Admin',
      email: `admin${Date.now()}@hackabyte.org`, // Use timestamp to ensure uniqueness
      password: 'HackAdmin2025!', // Will be hashed by the pre-save hook
      phoneNumber: '123-456-7890',
      school: 'Hackabyte Academy',
      dateOfBirth: birthDate,
      age: 19, // Set to maximum allowed age of 19
      // Since age is over 18, these will be validated but not required
      parentName: 'N/A',
      parentPhone: 'N/A',
      parentEmail: 'N/A@example.com',
      discordUsername: 'admin#0000',
      role: 'admin' // Set role to admin
    };

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists with this email.');
      process.exit(0);
    }
    
    // Create admin user
    const adminUser = new User(adminData);
    await adminUser.save();
    
    console.log('New admin user created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('Please log in with these credentials and change the password immediately.');
    
    // Disconnect from database
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the function
createAdminUser();
