/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "getstream.io",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
