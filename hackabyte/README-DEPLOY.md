# Hackabyte Website Deployment Guide

This document provides detailed instructions for deploying the Hackabyte website to Vercel, addressing the 404 error issues that may occur during deployment.

## Pre-Deployment Fixes Applied

We've made several changes to fix the 404 issues:

1. **Added Vercel Configuration**:
   - Added rewrite rules in `vercel.json` to ensure proper routing
   - Set environment variables for authentication
   - Configured clean URLs and trailing slash behavior

2. **Updated Next.js Configuration**:
   - Added fallback routing
   - Aligned Next.js and Vercel URL handling settings
   - Added rewrites for 404 handling

3. **Added Fallback Files**:
   - Created `public/404.html` for static fallback
   - Added `src/app/index.html` for root path redirects

## Deployment Checklist

Before deploying to Vercel, ensure:

1. **Environment Variables**: Set these in your Vercel project settings:
   - `MONGODB_URI`: Your MongoDB connection string 
   - `NEXTAUTH_SECRET`: Your JWT secret (can be generated with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `NEXTAUTH_URL`: Your production URL (e.g., https://hackabyte-website.vercel.app)
   - `NEXT_PUBLIC_APP_URL`: Same as NEXTAUTH_URL
   - `EMAIL_USER`: Your email service username
   - `EMAIL_PASSWORD`: Your email service password or app password

2. **Vercel Project Settings**:
   - Framework Preset: **Next.js**
   - Build Command: **npm run build**
   - Output Directory: **.next** (default)
   - Install Command: **npm install**
   - Node.js Version: **18.x** or higher

## Deployment Steps

1. **Push your code to GitHub**:
   ```
   git add .
   git commit -m "Fixed 404 errors and prepared for deployment"
   git push
   ```

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Configure project as noted in "Vercel Project Settings" above
   - Add the Environment Variables listed above
   - Deploy

3. **Troubleshooting Post-Deployment**:
   - If still encountering 404s:
     1. Check "Functions" tab in Vercel dashboard for errors
     2. Verify that all environment variables are set correctly
     3. Try using the "Redeploy" feature with "Clear cache and redeploy" option
   
## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Troubleshooting Next.js on Vercel](https://vercel.com/support/articles/nextjs-api-routes-not-working)

## Testing Locally

To verify the build locally before deploying:

```bash
npm run build
npm run start
```

Visit http://localhost:3000 to ensure everything works correctly.
