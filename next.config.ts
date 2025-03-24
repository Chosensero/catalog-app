import type { NextConfig } from "next";


const nextConfig : NextConfig = {
  output: 'export',
  basePath: '/catalog-app',
  assetPrefix: '/catalog-app/',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;
