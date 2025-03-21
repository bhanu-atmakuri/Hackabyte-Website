# Firebase Configuration Setup

This document explains how to set up environment variables for the Firebase configuration in the Hackabyte application.

## Environment Variables

The application uses environment variables to securely store Firebase configuration keys. These values should never be committed to the repository.

### Required Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

## How to Get Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Scroll down to "Your apps" section and select your web app (or create one if needed)
5. Under the "SDK setup and configuration" section, you'll find your Firebase configuration object
6. Copy these values to your `.env.local` file

## Security Notes

- Never commit `.env.local` to version control (it's already added to `.gitignore`)
- The `NEXT_PUBLIC_` prefix is required for these variables to be accessible in the browser
- For added security in production, consider using Firebase App Check

## Firestore Database Structure

The application expects the following collections in your Firestore database:

- `admins`: Admin user accounts
- `users`: Regular user accounts
- `events`: Hackathon events
- `registrations`: User registrations for events

## Additional Setup

### Firebase Authentication

This application uses Firebase Authentication for user management. Make sure to enable:

1. Email/Password authentication
2. Google authentication (optional)

### Firebase Analytics

For analytics to work properly:
1. Enable Google Analytics in your Firebase project
2. Make sure `measurementId` is properly set in your environment variables

