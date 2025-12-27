import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'urlyuofgakgubzsuazhd.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'aplus-avatars.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
