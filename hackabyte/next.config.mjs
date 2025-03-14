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
  
  // Ensure consistent URL handling with Vercel config
  trailingSlash: false,
  
  // Clean URLs without extensions
  cleanUrls: true,
  
  // Disables the x-powered-by header
  poweredByHeader: false,
  
  // Add fallback for 404 pages
  async rewrites() {
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
  },

  // Help with development environment
  reactStrictMode: true,
};

export default nextConfig;
