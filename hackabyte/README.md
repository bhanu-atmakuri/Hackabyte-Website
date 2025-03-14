# Hackabyte Registration System

A comprehensive registration system for Hackabyte events, featuring user authentication, event registration, and administrative controls.

## Features

- **User Authentication**
  - Account registration with email verification
  - Secure login with password hashing
  - Password reset functionality
  - JWT-based sessions

- **Event Registration**
  - Register for upcoming events
  - Team formation options
  - Event-specific information collection

- **User Dashboard**
  - View registered events
  - Manage profile information
  - Quick access to upcoming events

- **Admin Interface**
  - User management (view, search, edit)
  - Registration management
  - Data export functionality

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes (serverless)
- **Database**: MongoDB
- **Authentication**: Custom JWT-based system
- **Email**: Nodemailer with Google SMTP

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hackabyte-website.git
cd hackabyte-website
```

### 2. Install Dependencies

```bash
cd hackabyte
npm install
```

### 3. Set Up MongoDB Atlas

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
2. Build a new database (free tier is sufficient)
3. Choose Google Cloud as provider
4. Name your cluster "hackabyte-registration"
5. Create a database user
6. Set up network access (IP whitelist)
7. Get your MongoDB connection string

### 4. Configure Environment Variables

Create a `.env.local` file in the `hackabyte` directory:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=a_random_string_for_encryption
NEXTAUTH_URL=http://localhost:3000
EMAIL_USER=your_google_email@gmail.com
EMAIL_PASSWORD=your_app_password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production, set these environment variables in your Vercel project.

### 5. Set Up Google Email

1. Use a Gmail account
2. Enable 2-factor authentication
3. Generate an App Password:
   - Go to Google Account > Security
   - Under "Signing in to Google," select "App passwords"
   - Select "Mail" and "Other"
   - Name it "Hackabyte Registration"
   - Copy the generated password for EMAIL_PASSWORD

### 6. Test Your Setup

Run the authentication test script:

```bash
node scripts/test-auth.js
```

This will test:
- MongoDB connection
- User creation
- User retrieval
- Password verification

### 7. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure the environment variables in Vercel project settings
4. Deploy

For the production deployment, set environment variables to:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=a_random_string_for_encryption
NEXTAUTH_URL=https://your-domain.com
EMAIL_USER=your_google_email@gmail.com
EMAIL_PASSWORD=your_app_password
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Troubleshooting

### NextAuth.js Issues

If you encounter issues with NextAuth.js:

1. Make sure `NEXTAUTH_SECRET` is properly set
2. Ensure the imports in `src/lib/auth/auth.js` and `src/app/api/auth/[...nextauth]/route.js` are correct
3. Verify the `NEXTAUTH_URL` matches your deployment URL

#### NextAuth.js Build Errors

If you encounter build errors:

1. **Dependency Conflicts**: This project uses NextAuth.js with Next.js 15, which requires:
   - Using `next-auth@latest` in package.json
   - Adding `--legacy-peer-deps` flag to npm installation in vercel.json:
     ```json
     {
       "build": {
         "env": {
           "NPM_FLAGS": "--legacy-peer-deps"
         }
       }
     }
     ```

2. **Runtime Errors**: If you see errors like `TypeError: s is not a function`:
   - Make sure to use the standard NextAuth.js pattern for App Router:
     ```javascript
     import NextAuth from 'next-auth';
     const handler = NextAuth(authOptions);
     export { handler as GET, handler as POST };
     ```
   - Simplify the `authorize` function in credentials provider to return `null` instead of throwing errors
   - Ensure all environment variables are correctly set in your Vercel project

### MongoDB Connection Issues

If MongoDB connection fails:

1. Verify your connection string in `.env.local`
2. Check if your IP is whitelisted in MongoDB Atlas
3. Ensure your database user has the correct permissions

### Email Sending Issues

If emails aren't being sent:

1. Make sure 2FA is enabled in your Google account
2. Verify you're using an App Password, not your regular password
3. Check if `EMAIL_USER` and `EMAIL_PASSWORD` are set correctly

## License

This project is licensed under the MIT License - see the LICENSE file for details.
