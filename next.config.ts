import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80")],
  },
};

export default nextConfig;
