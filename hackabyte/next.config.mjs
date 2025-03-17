/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure experimental edge runtime isn't enabled by default
  experimental: {
    // Remove any runtime: 'edge' settings if they exist
  },
  // Next.js server components and API routes setup
  // Vercel will automatically use the correct output mode
  
  // Images configuration
  images: {
    domains: ['localhost'],
    // Add Vercel domains for image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
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
  },
  
  // Add environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
  },
};

export default nextConfig;
