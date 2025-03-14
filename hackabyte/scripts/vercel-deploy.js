#!/usr/bin/env node

/**
 * Vercel Clean Deployment Script
 * 
 * This script helps ensure a clean deployment to Vercel by:
 * 1. Cleaning build artifacts
 * 2. Verifying build succeeds locally first
 * 3. Providing instructions for Vercel deployment
 * 
 * Run with: node scripts/vercel-deploy.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for better output formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Helper function to print colored messages
function print(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

// Helper function to run commands and handle errors
function runCommand(command, errorMessage) {
  try {
    print(colors.cyan, `Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    print(colors.red, `${errorMessage || 'Command failed'}: ${error.message}`);
    return false;
  }
}

// Main function
async function main() {
  print(colors.bright + colors.magenta, '\n=== VERCEL CLEAN DEPLOYMENT SCRIPT ===\n');
  
  // Step 1: Clean up any previous builds
  print(colors.yellow, '1. Cleaning previous build artifacts...');
  
  // Check if .next directory exists and remove it
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    try {
      fs.rmSync(nextDir, { recursive: true, force: true });
      print(colors.green, '   ✓ Removed .next directory');
    } catch (error) {
      print(colors.red, `   ✗ Error removing .next directory: ${error.message}`);
    }
  } else {
    print(colors.dim, '   ✓ No .next directory found (already clean)');
  }

  // Step 2: Install dependencies
  print(colors.yellow, '\n2. Installing dependencies...');
  if (!runCommand('npm install', 'Failed to install dependencies')) {
    return;
  }

  // Step 3: Build the project
  print(colors.yellow, '\n3. Testing build locally...');
  if (!runCommand('npm run build', 'Build failed')) {
    return;
  }

  // Success - project built successfully
  print(colors.bright + colors.green, '\n✅ LOCAL BUILD SUCCESSFUL\n');
  
  // Step 4: Deployment instructions
  print(colors.bright + colors.blue, '=== VERCEL DEPLOYMENT INSTRUCTIONS ===\n');
  print(colors.white, '1. Push all changes to your GitHub repository:');
  print(colors.dim, '   git add .');
  print(colors.dim, '   git commit -m "Fix 404 errors with static HTML fallback"');
  print(colors.dim, '   git push\n');
  
  print(colors.white, '2. Go to your Vercel project dashboard');
  print(colors.white, '3. Click "Deployments" tab');
  print(colors.white, '4. For your latest deployment, click the three dots (...) and select "Redeploy"');
  print(colors.white, '5. Check the "Clear cache and redeploy" option');
  print(colors.white, '6. Click "Redeploy"\n');
  
  print(colors.bright + colors.yellow, 'IMPORTANT NOTES:');
  print(colors.white, '- Make sure all environment variables are set correctly in Vercel');
  print(colors.white, '- The _app.html file should be in the root of your repository');
  print(colors.white, '- The vercel.json file has been completely overhauled\n');
  
  print(colors.bright + colors.magenta, '=== END OF SCRIPT ===\n');
}

// Run the script
main().catch(error => {
  print(colors.bright + colors.red, `\nERROR: ${error.message}\n`);
  process.exit(1);
});
