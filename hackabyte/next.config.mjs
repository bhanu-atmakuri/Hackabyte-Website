/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for image optimization
  images: {
    domains: ['hackabyte.org'],
    unoptimized: false,
  },
  
  // Disables the x-powered-by header
  poweredByHeader: false,
  
  // Help with development experience
  reactStrictMode: true,
};

export default nextConfig;
