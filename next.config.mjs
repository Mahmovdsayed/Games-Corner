/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  productionBrowserSourceMaps: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
    ],
  },
  env: {
    API_KEY: process.env.RAWG_API_KEY,
  },
};
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});
module.exports = withPWA(nextConfig);
