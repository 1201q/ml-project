/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  async redirects() {
    return [
      { source: "/stage/post", destination: "/", permanent: false },
      { source: "/stage/result", destination: "/", permanent: false },
      { source: "/stage/upload", destination: "/", permanent: false },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withPWA(nextConfig);
