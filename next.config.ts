import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/jakecloud07/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      { // just for make template
        protocol: 'https',
        hostname: 'sjc.microlink.io'
      }
    ]
  }
};

export default nextConfig;
