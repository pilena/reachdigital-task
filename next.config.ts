import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.reachdigital.dev",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "backend.reachdigital.dev",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
