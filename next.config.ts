import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.aivoicehq.com",
        port: "",
        pathname: "/case-studies/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "www.aivoicehq.com",
        port: "",
        pathname: "/sample-menus/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
