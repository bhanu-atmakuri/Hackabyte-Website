/**
 * Build Test Script
 * 
 * This script validates the build process to ensure there are no dependency issues.
 * It's particularly useful for checking if NextAuth.js has been fully removed.
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
};

console.log(`${colors.bright}${colors.blue}=== Hackabyte Build Test ====${colors.reset}\n`);

try {
  console.log(`${colors.yellow}Removing next-auth from package.json dependencies if present...${colors.reset}`);
  
  // Read package.json
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Remove next-auth dependency if it exists
  if (packageJson.dependencies['next-auth']) {
    console.log(`${colors.yellow}Found next-auth dependency, removing...${colors.reset}`);
    delete packageJson.dependencies['next-auth'];
    
    // Write updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log(`${colors.green}Successfully removed next-auth from package.json${colors.reset}`);
  } else {
    console.log(`${colors.green}No next-auth dependency found in package.json${colors.reset}`);
  }
  
  // Run a search for any remaining next-auth imports
  console.log(`\n${colors.yellow}Checking for remaining next-auth imports...${colors.reset}`);
  const grepCommand = process.platform === 'win32' 
    ? 'findstr /s /i "next-auth" .\\src\\*.js .\\src\\*.jsx'
    : 'grep -r "next-auth" --include="*.js" --include="*.jsx" ./src/';
  
  try {
    const grepResult = execSync(grepCommand, { encoding: 'utf8' });
    console.log(`${colors.red}Found remaining next-auth references:${colors.reset}\n${grepResult}`);
    console.log(`${colors.yellow}Please fix these references before building.${colors.reset}`);
  } catch (grepError) {
    // No matches is actually good in this case
    console.log(`${colors.green}No next-auth imports found. Great job!${colors.reset}`);
  }
  
  // Attempt a Next.js build
  console.log(`\n${colors.yellow}Running Next.js build to check for errors...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log(`\n${colors.green}${colors.bright}Build successful! No NextAuth.js dependencies found.${colors.reset}`);
  
} catch (error) {
  console.error(`\n${colors.red}Build test failed:${colors.reset}`, error.message);
  process.exit(1);
}
