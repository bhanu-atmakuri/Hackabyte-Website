/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure trailing slashes are handled consistently
  trailingSlash: false,
  
  // Proper image optimization for Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Ensures proper handling of rewrites and redirects for Vercel
  poweredByHeader: false,
};

export default nextConfig;
