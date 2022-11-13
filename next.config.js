/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack, isServer, dev }) => {
    if (!isServer && !dev) {
      config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
    }
    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
