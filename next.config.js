/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["cdn.sanity.io"], formats: ["image/avif", "image/webp"] },
};

module.exports = nextConfig;
