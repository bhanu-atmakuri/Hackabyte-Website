// Test script to verify NextAuth module importing correctly
import { handler } from '../src/app/api/auth/[...nextauth]/route.js';

console.log('Successfully imported NextAuth handler');
console.log('Handler type:', typeof handler);
