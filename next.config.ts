/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "res.cloudinary.com",        // ✅ Cloudinary images
      "lh3.googleusercontent.com", // ✅ Google user images
      "backend-strapi-8.onrender.com", // ✅ Strapi backend (if hosting images)
      "'localhost', // Allow localhost to be used for image fetching"
    ],
  },
};

module.exports = nextConfig;


