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
  
  // Clean URLs without extensions (only in production)
  ...(process.env.NODE_ENV === 'production' ? { cleanUrls: true } : {}),
  
  // Disables the x-powered-by header
  poweredByHeader: false,
  
  // Environment-specific rewrites
  async rewrites() {
    if (process.env.NODE_ENV === 'production') {
      // Production rewrites for Vercel deployment
      return [
        {
          source: '/:path*',
          destination: '/',
          has: [
            {
              type: 'header',
              key: 'x-matched-path',
              value: '(?!/_next|/api).*',
            },
          ],
        },
      ];
    } else {
      // Development - no special rewrites
      return [];
    }
  },

  // Development settings
  reactStrictMode: true,
};

export default nextConfig;
