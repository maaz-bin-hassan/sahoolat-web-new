/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Next.js 15 recommended settings
  reactStrictMode: true,
  // Fix routing for both mobile and desktop
  trailingSlash: false,
  // Ensure proper static generation
  output: undefined,
};

export default nextConfig;

 