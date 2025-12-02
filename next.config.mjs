/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization with modern formats
    formats: ['image/avif', 'image/webp'],
    // Define device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Minimize memory usage
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Next.js 15 recommended settings
  reactStrictMode: true,
  // Fix routing for both mobile and desktop
  trailingSlash: false,
  // Ensure proper static generation
  output: undefined,
};

export default nextConfig;

 