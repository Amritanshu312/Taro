/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s4.anilist.co', "i.ytimg.com", 'artworks.thetvdb.com'],
  }
};

export default nextConfig;
