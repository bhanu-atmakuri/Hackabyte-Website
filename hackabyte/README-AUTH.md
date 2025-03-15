# Hackabyte Authentication & Event Registration System

This document provides an overview of the authentication and event registration system implemented for Hackabyte's website.

## System Overview

The system replaces Google Forms with an integrated solution that:
- Handles user registration and login
- Collects detailed participant information during account creation
- Provides event-specific registration forms
- Manages event registrations with team formation options
- Includes an admin dashboard for user and event management
- Sends automated emails for account verification and event registrations

## Components

1. **User Authentication**
   - Full registration flow with email/password
   - Password reset capabilities
   - Session management with NextAuth.js

2. **User Profiles**
   - Stores participant details (name, email, school, age, etc.)
   - Parent/guardian information
   - Profile editing capabilities

3. **Event Registration**
   - Event-specific registration forms
   - Team formation options (create team, join team, individual)
   - Experience level and other hackathon-specific details
   - Registration confirmation emails

4. **Admin Portal**
   - User management (view, edit, delete users)
   - Event management (create, edit, view registrations, delete events)
   - Registration data access and management

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file with the following variables:

```
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# SendGrid Email API Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_verified_sender_email
```

### 2. Database Setup

The system uses MongoDB with the following collections:
- `users` - User accounts and profiles
- `events` - Event details and information
- `eventregistrations` - Registration records linking users to events

### 3. Email Service Setup

1. Create a SendGrid account
2. Set up Sender Authentication for your domain
3. Create an API key and add it to your `.env.local` file

## Usage Guide

### User Flow

1. **Registration**
   - Users register at `/auth` with the Register tab
   - Required information includes personal details and parent/guardian info
   - Upon successful registration, a welcome email is sent

2. **Login**
   - Users login at `/auth` using their email and password
   - "Forgot Password" functionality is available for account recovery

3. **Event Registration**
   - Authenticated users can register for events at `/events/[eventId]/register`
   - Forms collect event-specific details and team information
   - Confirmation emails are sent upon successful registration

4. **User Dashboard**
   - Users can view and edit their profile at `/dashboard`
   - The dashboard shows all events they've registered for

### Admin Flow

1. **Admin Access**
   - Admin portal is available at `/admin`
   - Access is restricted to users with the admin role

2. **User Management**
   - View all registered users
   - Edit user details and roles
   - Remove users if necessary

3. **Event Management**
   - Create and edit events
   - View detailed registration lists
   - Access participant information

## Routes and Endpoints

### Auth API Routes

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/password/forgot` - Request password reset
- `POST /api/auth/password/reset` - Reset password with token

### User API Routes

- `GET /api/user` - Get current user profile
- `PUT /api/user` - Update user profile

### Event API Routes

- `GET /api/events` - Get all events or specific event
- `POST /api/events` - Create new event (admin only)
- `POST /api/events/register` - Register user for an event

### Admin API Routes

- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users` - Update user (admin only)
- `DELETE /api/admin/users` - Delete user (admin only)
- `GET /api/admin/events` - Get all events with registration stats (admin only)
- `PUT /api/admin/events` - Update event (admin only)
- `DELETE /api/admin/events` - Delete event (admin only)

## How to Create an Admin User

The first user can be promoted to admin by directly updating the MongoDB record:

```javascript
// In MongoDB shell or similar tool
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Dependencies

This system relies on:
- Next.js and React for the frontend
- NextAuth.js for authentication
- MongoDB for data storage
- SendGrid for email services
- React Hook Form for form handling
- Framer Motion for animations
- React Toastify for notifications
