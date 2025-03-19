/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove `appDir` because in Next.js 15+ the App Router is already default
    turbo: {
      // Disable Turbopack for certain server modules
      exclude: ["fs"],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Provide fallback for 'fs' module in client-side code
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

export default nextConfig;
