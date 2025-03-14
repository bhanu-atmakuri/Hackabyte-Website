/**
 * Deployment Script
 * 
 * This script performs pre-deployment verification and generates instructions
 * for proper deployment to Vercel or other hosting platforms.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Print header
console.log(`${colors.bright}${colors.blue}=== Hackabyte Deployment Helper ====${colors.reset}\n`);

// Check environment variables
const checkEnvironmentVariables = () => {
  console.log(`${colors.yellow}Checking required environment variables...${colors.reset}`);
  
  const requiredVars = [
    'MONGODB_URI',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'EMAIL_USER',
    'EMAIL_PASSWORD',
    'NEXT_PUBLIC_APP_URL'
  ];
  
  let envFile = '.env.local';
  
  try {
    if (!fs.existsSync(envFile)) {
      console.log(`${colors.yellow}No .env.local file found, checking .env...${colors.reset}`);
      envFile = '.env';
      if (!fs.existsSync(envFile)) {
        console.log(`${colors.red}No environment files found.${colors.reset}`);
        return false;
      }
    }
    
    const envContent = fs.readFileSync(envFile, 'utf8');
    const missingVars = [];
    
    for (const varName of requiredVars) {
      if (!envContent.includes(`${varName}=`)) {
        missingVars.push(varName);
      }
    }
    
    if (missingVars.length > 0) {
      console.log(`${colors.red}Missing required environment variables: ${missingVars.join(', ')}${colors.reset}`);
      return false;
    }
    
    console.log(`${colors.green}All required environment variables are set.${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error checking environment variables:${colors.reset}`, error);
    return false;
  }
};

// Check configuration for static export settings
const checkNextConfig = () => {
  console.log(`${colors.yellow}Checking Next.js configuration...${colors.reset}`);
  
  try {
    const configPath = path.resolve(process.cwd(), 'next.config.mjs');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    if (configContent.includes("output: 'export'")) {
      console.log(`${colors.red}Found 'output: export' in next.config.mjs. This will cause issues with API routes.${colors.reset}`);
      return false;
    }
    
    console.log(`${colors.green}Next.js configuration looks good for server-side rendering.${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error checking Next.js configuration:${colors.reset}`, error);
    return false;
  }
};

// Check for any remaining NextAuth.js references
const checkNextAuthReferences = () => {
  console.log(`${colors.yellow}Checking for remaining NextAuth.js references...${colors.reset}`);
  
  try {
    const command = process.platform === 'win32' 
      ? 'findstr /s /i "next-auth" .\\src\\*.js .\\src\\*.jsx'
      : 'grep -r "next-auth" --include="*.js" --include="*.jsx" ./src/';
    
    try {
      const result = execSync(command, { encoding: 'utf8' });
      console.log(`${colors.red}Found remaining NextAuth.js references:${colors.reset}\n${result}`);
      return false;
    } catch (error) {
      // No matches found is good
      console.log(`${colors.green}No NextAuth.js references found.${colors.reset}`);
      return true;
    }
  } catch (error) {
    console.error(`${colors.red}Error checking NextAuth.js references:${colors.reset}`, error);
    return false;
  }
};

// Try to build the project
const testBuild = () => {
  console.log(`${colors.yellow}Testing build process...${colors.reset}`);
  
  try {
    console.log('Running build (this may take a few minutes)...');
    execSync('npm run build', { encoding: 'utf8' });
    console.log(`${colors.green}Build successful!${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Build failed:${colors.reset}\n${error.stdout || error.message}`);
    return false;
  }
};

// Generate deployment instructions
const generateDeploymentInstructions = () => {
  console.log(`\n${colors.bright}${colors.cyan}=== Deployment Instructions ===${colors.reset}\n`);
  
  console.log(`${colors.bright}To deploy to Vercel:${colors.reset}`);
  console.log('1. Make sure your project is committed to a GitHub repository');
  console.log('2. Connect your repository to Vercel');
  console.log('3. Set the following environment variables in the Vercel dashboard:');
  console.log('   - MONGODB_URI (Your MongoDB connection string)');
  console.log('   - NEXTAUTH_SECRET (Your JWT secret)');
  console.log('   - NEXTAUTH_URL (Your production URL, e.g., https://your-app.vercel.app)');
  console.log('   - NEXT_PUBLIC_APP_URL (Same as NEXTAUTH_URL)');
  console.log('   - EMAIL_USER (Your email service username)');
  console.log('   - EMAIL_PASSWORD (Your email service password or app password)');
  console.log('4. Make sure to select the "Node.js" environment');
  console.log('5. Deploy the project');
  
  console.log(`\n${colors.bright}Troubleshooting:${colors.reset}`);
  console.log('- If you see 404 errors, check your middleware configuration');
  console.log('- If you see authentication errors, verify your environment variables');
  console.log('- Check browser console for client-side errors');
  console.log('- Review Vercel deployment logs for server-side errors');
};

// Main execution
try {
  const envCheck = checkEnvironmentVariables();
  const configCheck = checkNextConfig();
  const nextAuthCheck = checkNextAuthReferences();
  
  console.log('\n=== Summary ===');
  console.log(`Environment Variables: ${envCheck ? colors.green + 'PASS' : colors.red + 'FAIL'}`);
  console.log(`Next.js Configuration: ${configCheck ? colors.green + 'PASS' : colors.red + 'FAIL'}`);
  console.log(`NextAuth References: ${nextAuthCheck ? colors.green + 'PASS' : colors.red + 'FAIL'}`);
  console.log(colors.reset);
  
  if (envCheck && configCheck && nextAuthCheck) {
    console.log(`${colors.green}All checks passed! Proceeding with build test...${colors.reset}\n`);
    const buildSuccess = testBuild();
    
    if (buildSuccess) {
      console.log(`\n${colors.bright}${colors.green}All tests passed! Your project is ready for deployment.${colors.reset}\n`);
      generateDeploymentInstructions();
    } else {
      console.log(`\n${colors.red}Build test failed. Please fix the issues before deploying.${colors.reset}`);
    }
  } else {
    console.log(`${colors.yellow}Some checks failed. Please fix the issues before proceeding.${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}Unexpected error:${colors.reset}`, error);
  process.exit(1);
}
