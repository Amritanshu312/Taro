/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s4.anilist.co', "i.ytimg.com", 'artworks.thetvdb.com', 'media.kitsu.io', 'kitsu-production-media.s3.us-west-002.backblazeb2.com'],
  }
};

export default nextConfig;
