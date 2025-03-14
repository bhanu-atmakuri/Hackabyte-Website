/** @type {import('next').NextConfig} */
const nextConfig = {
  // Comment out static export to support API routes with NextAuth
  // output: 'export',
  
  // API routes require server-side rendering
  // distDir: 'out',
  
  // Required for static export with images
  images: {
    unoptimized: true
  },
  
  // Ensure consistent URL handling
  trailingSlash: true,
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
  
  // Experimental features for Next.js 15
  experimental: {
    serverComponentsExternalPackages: ['next-auth']
  }
};

export default nextConfig;
