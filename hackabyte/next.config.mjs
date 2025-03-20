/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export configuration for Vercel deployment
  // Vercel automatically handles this part correctly
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
};

export default nextConfig;
