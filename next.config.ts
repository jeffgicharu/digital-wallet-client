import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.18.192',
        port: '8080',
        pathname: '/api/**',
      },
    ],
  },
};

export default nextConfig;
