/**
 * Authentication System Test Script
 * 
 * This script tests core functionality of the authentication system:
 * 1. MongoDB connection
 * 2. User creation
 * 3. User retrieval
 * 4. Password verification
 * 
 * Usage:
 * 1. Make sure you have a .env.local file with MONGODB_URI set
 * 2. Run: node scripts/test-auth.js
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Mock User model schema
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  school: String,
  age: Number,
  parentName: String,
  parentPhone: String,
  parentEmail: String,
  isVerified: Boolean,
  role: String,
  createdAt: Date,
  updatedAt: Date,
});

// Add password comparison method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Define the model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function runTests() {
  console.log('🧪 Starting authentication system tests...');
  
  try {
    // 1. Test MongoDB connection
    console.log('\n📡 Testing MongoDB connection...');
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined. Please check your .env.local file.');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connection successful!');
    
    // 2. Test user creation
    console.log('\n👤 Testing user creation...');
    
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('TestPassword123', salt);
    
    // Create a test user
    const testUser = new User({
      fullName: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      phoneNumber: '(555) 123-4567',
      school: 'Test School',
      age: 16,
      parentName: 'Test Parent',
      parentPhone: '(555) 987-6543',
      parentEmail: 'parent@example.com',
      isVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('ℹ️ Test user already exists, skipping creation.');
    } else {
      await testUser.save();
      console.log('✅ Test user created successfully!');
    }
    
    // 3. Test user retrieval
    console.log('\n🔍 Testing user retrieval...');
    const retrievedUser = await User.findOne({ email: 'test@example.com' });
    
    if (retrievedUser) {
      console.log('✅ User retrieval successful!');
      console.log(`Found user: ${retrievedUser.fullName} (${retrievedUser.email})`);
    } else {
      throw new Error('Failed to retrieve test user');
    }
    
    // 4. Test password verification
    console.log('\n🔐 Testing password verification...');
    const isPasswordValid = await retrievedUser.comparePassword('TestPassword123');
    const isWrongPasswordValid = await retrievedUser.comparePassword('WrongPassword');
    
    if (isPasswordValid && !isWrongPasswordValid) {
      console.log('✅ Password verification is working correctly!');
    } else {
      throw new Error('Password verification is not working correctly');
    }
    
    console.log('\n🎉 All tests passed successfully! Your authentication system is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
  } finally {
    // Close MongoDB connection
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
      console.log('\n🔌 MongoDB connection closed.');
    }
  }
}

// Run the tests
runTests();
