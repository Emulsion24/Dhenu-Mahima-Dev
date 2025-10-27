/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // allow all HTTPS hosts
      { protocol: "http", hostname: "**" },  // allow all HTTP hosts (if needed)
    ],
  },
};

export default nextConfig;
