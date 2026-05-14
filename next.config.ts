import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname, // Explicitly set workspace root to this project
  },
};

export default nextConfig;
