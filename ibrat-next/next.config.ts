import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|ico|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/brat-creator/',
        destination: '/brat-maker/',
        permanent: true,
      },
      {
        source: '/brat-summer-meme-generator/',
        destination: '/brat-maker/',
        permanent: true,
      },
      {
        source: '/what-is-brat-generator/',
        destination: '/blog/what-is-brat-generator/',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/about/',
        permanent: true,
      },
      {
        source: '/contact-us/',
        destination: '/contact/',
        permanent: true,
      },
      {
        source: '/terms-conditions/',
        destination: '/terms/',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
