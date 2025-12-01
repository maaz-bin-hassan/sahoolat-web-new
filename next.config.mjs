/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/SahoolatAi" : "",
  assetPrefix: isProd ? "/SahoolatAi/" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
  // Next.js 15 recommended settings
  reactStrictMode: true,
};

export default nextConfig;

 