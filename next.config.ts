import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com',"lh3.googleusercontent.com",],
     // Add the Cloudinary domain here
  },
};

export default nextConfig;


