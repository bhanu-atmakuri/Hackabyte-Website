/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  // Enable server-side API routes for NextAuth
  // output: 'export', // <-- Removed static export which breaks API routes
  
  // Images configuration
  images: {
    domains: ['localhost'],
  },
  
  // Ensure consistent URL handling
  trailingSlash: true,
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
  
  // Add webpack configuration to handle module resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      'lib': path.resolve(__dirname, './lib'),
      'models': path.resolve(__dirname, './models')
    };
    return config;
  }
};

export default nextConfig;
