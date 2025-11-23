import type { NextConfig } from "next";

interface ExtendedNextConfig extends NextConfig {
  cacheComponents?: boolean;
  reactCompiler?: boolean;
  experimental?: {
    appDir?: boolean;
    serverComponents?: boolean;
    turbo?: boolean;
    optimizeCss?: boolean;
    turbopackFileSystemCacheForDev?: boolean;
  };
}

const nextConfig: ExtendedNextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    appDir: true,
    serverComponents: true,
    turbo: true,
    optimizeCss: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
