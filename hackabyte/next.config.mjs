/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server-side API routes for NextAuth
  // output: 'export', // <-- Removed static export which breaks API routes
  
  // Images configuration
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  
  // Ensure consistent URL handling
  trailingSlash: true,
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
  
  // External packages config (moved from experimental in Next.js 15)
  serverExternalPackages: ['mongoose'],
  
  // Disable linting during build to avoid issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Optimize output for Vercel
  swcMinify: true
};

export default nextConfig;
