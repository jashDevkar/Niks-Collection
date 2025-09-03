import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 experimental: {
    appDocumentPreloading: true, // if you are using the app router
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.102:3000", // your machine’s IP
  ],
  
};

export default nextConfig;
