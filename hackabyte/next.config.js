/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure experimental edge runtime isn't enabled by default
  experimental: {
    // Remove any runtime: 'edge' settings if they exist
  }
}

// Convert from CommonJS to ES Module syntax
export default nextConfig;
