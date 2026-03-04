import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hotproductsdot",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
