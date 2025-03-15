/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server-side API routes for NextAuth
  // output: 'export', // <-- Removed static export which breaks API routes
  
  // Images configuration
  images: {
    domains: ['localhost'],
  },
  
  // Ensure consistent URL handling
  trailingSlash: false,
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
  
  // Simplified module resolution
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  }
};

export default nextConfig;
