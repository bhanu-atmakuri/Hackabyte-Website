/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force static HTML export for Vercel deployment
  output: 'export',
  
  // Specify output directory
  distDir: 'out',
  
  // Required for static export with images
  images: {
    unoptimized: true
  },
  
  // Ensure consistent URL handling
  trailingSlash: true,
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
};

export default nextConfig;
