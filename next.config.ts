/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"], // ✅ Fixed array format
  },
  experimental: {
    turbo: false, // ✅ Disabled Turbopack
  },
};

module.exports = nextConfig;


