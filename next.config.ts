import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Emits .next/standalone with only the files the server actually needs, so
   * the runtime Docker image carries no dev dependencies and no source.
   */
  output: "standalone",
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
