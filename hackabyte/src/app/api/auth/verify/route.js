import { verifyAuthToken, isUserAdmin } from '@/lib/firebase/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json({ valid: false, admin: false }, { status: 400 });
    }
    
    const decodedToken = await verifyAuthToken(token);
    
    if (!decodedToken) {
      return NextResponse.json({ valid: false, admin: false }, { status: 401 });
    }
    
    // Check if the user has admin claims
    const isAdmin = await isUserAdmin(decodedToken.uid);
    
    return NextResponse.json({ 
      valid: true, 
      admin: isAdmin,
      uid: decodedToken.uid
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ valid: false, admin: false }, { status: 500 });
  }
}
