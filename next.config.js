/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      { source: "/stage/post", destination: "/", permanent: false },
      { source: "/stage/result", destination: "/", permanent: false },
      { source: "/stage/upload", destination: "/", permanent: false },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
