// Script to create an admin user
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

    // Admin user data - customize as needed
    const adminData = {
      name: 'Admin User',
      email: 'admin@hackabyte.org',
      password: 'Admin@123456', // Will be hashed by the pre-save hook
      phoneNumber: '123-456-7890',
      school: 'Hackabyte Academy',
      age: 18,
      parentName: 'Parent Name',
      parentPhone: '123-456-7890',
      parentEmail: 'parent@example.com',
      dietaryRestrictions: 'None',
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
    
    console.log('Admin user created successfully!');
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
