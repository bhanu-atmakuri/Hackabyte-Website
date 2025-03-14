/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-side rendering with API routes support
  
  // Required for image optimization
  images: {
    domains: ['hackabyte.org'],
    unoptimized: false,
  },
  
  // Disables the x-powered-by header
  poweredByHeader: false,
  
  // Let Next.js handle routing without custom rewrites
  // This simplifies things for both development and production
  
  // React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
