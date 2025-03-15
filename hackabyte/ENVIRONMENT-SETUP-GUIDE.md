# Detailed Environment Setup Guide

This guide provides step-by-step instructions for obtaining each of the environment variables needed for the Hackabyte authentication and registration system.

## 1. MongoDB Connection String

### Option A: MongoDB Atlas (Cloud Database - Recommended)

1. **Create a MongoDB Atlas account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in
   - Click "Build a Database" and select the free tier option

2. **Create a new cluster**:
   - Choose a cloud provider (AWS, Google Cloud, or Azure)
   - Select a region closest to your users
   - Choose the free tier (M0)
   - Name your cluster (e.g., "hackabyte")

3. **Set up database access**:
   - In the left sidebar, click "Database Access"
   - Click "Add New Database User"
   - Create a username and strong password
   - Set privileges to "Read and Write to any database"
   - Save the username and password safely

4. **Set up network access**:
   - In the left sidebar, click "Network Access"
   - Click "Add IP Address"
   - For development, select "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add your server's IP address

5. **Get your connection string**:
   - In the left sidebar, click "Database" and then "Connect"
   - Select "Connect your application"
   - Choose "Node.js" and the latest version
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `hackabyte`

Example: `mongodb+srv://username:password@cluster0.mongodb.net/hackabyte?retryWrites=true&w=majority`
mongodb+srv://HackabyteAdmin:<HackForLife0223>@hackabyte-events.jj2fd.mongodb.net/?retryWrites=true&w=majority&appName=hackabyte-events

### Option B: Local MongoDB Installation

1. **Install MongoDB** on your local machine following [MongoDB's installation guide](https://docs.mongodb.com/manual/installation/)
2. **Start the MongoDB service**
3. **Use this connection string**: `mongodb://localhost:27017/hackabyte`

## 2. NextAuth.js Secret

This is a random string used to hash tokens and sign cookies. You can generate it in several ways:

### Option A: Using OpenSSL (Recommended)

1. Open your terminal
2. Run the following command:
   ```bash
   openssl rand -base64 32
   ```
3. Copy the generated string

### Option B: Online Secret Generator

1. Go to [GeneratePlus](https://generate.plus/en/base64) or a similar secure generator
2. Generate a random Base64 string of at least 32 characters
3. Copy the generated string

ofHnL1u_1KTcQ7Jj8369lHMmsH8tPP6StMLzn8L9SGM

### Option C: Node.js

1. Open your terminal
2. Run Node.js:
   ```bash
   node
   ```
3. Generate a random string:
   ```javascript
   console.log(require('crypto').randomBytes(32).toString('hex'))
   ```
4. Copy the generated string

## 3. Gmail App Password Setup

To use Gmail for sending emails, you'll need to create an App Password. This is a secure way to allow our application to send emails using your Gmail account without storing your actual Google account password.

### Prerequisites

- A Google Account with 2-Step Verification enabled
- If you don't have 2-Step Verification enabled, you'll need to set it up first

### Step 1: Enable 2-Step Verification (if not already enabled)

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left panel
3. Under "Signing in to Google," select "2-Step Verification"
4. Follow the on-screen steps to turn on 2-Step Verification

### Step 2: Create an App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left panel
3. Under "Signing in to Google," select "App passwords"
   - If you don't see this option, it might be because:
     - 2-Step Verification is not set up for your account
     - 2-Step Verification is set up but not turned on
     - Your account is through work, school, or other organization
     - You've turned on Advanced Protection for your account
4. At the bottom, select "Select app" and choose "Other (Custom name)"
5. Enter "Hackabyte Website" or another name to help you identify this password
6. Select "Generate"
7. The app password is the 16-character code that appears (like: xxxx xxxx xxxx xxxx)
8. Copy this password and store it securely - you'll use it as the EMAIL_APP_PASSWORD in your .env.local file
9. Click "Done"

### Step 3: Configure Your Gmail Account

1. Update your `.env.local` file with:
   ```
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_APP_PASSWORD=your_16_character_app_password
   ```
2. Make sure to use the exact Gmail address associated with the App Password you generated

### Important Notes on Gmail Usage:

- Gmail has sending limits (500 emails per day for regular Gmail accounts, 2000 for Google Workspace accounts)
- Your application must comply with Gmail's sending policies
- For high-volume email sending, consider using a dedicated email service instead

## 4. Putting It All Together

Now, update your `.env.local` file with all these values:

```
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/hackabyte?retryWrites=true&w=majority

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

# Gmail Email Configuration
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_APP_PASSWORD=your_16_character_app_password
```

For production deployment:
- Update `NEXTAUTH_URL` to your production domain (e.g., `https://hackabyte.org`)
- Ensure your MongoDB Atlas IP access list includes your server's IP address

## 5. Testing Your Configuration

Once your environment variables are set up, you can test if everything works:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test user registration at `/auth` - this will verify both MongoDB and Gmail are working
3. Check the MongoDB database to confirm user creation
4. Verify the welcome email was sent to your registered email address
