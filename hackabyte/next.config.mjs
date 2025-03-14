/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-side rendering with API routes support
  // Remove static export to enable API routes
  
  // Required for image optimization
  images: {
    domains: ['hackabyte.org'],
    // Use image optimization instead of unoptimized
    unoptimized: false,
  },
  
  // Ensure consistent URL handling
  trailingSlash: true,
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
};

export default nextConfig;
