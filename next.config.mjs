/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      's4.anilist.co',
      "i.ytimg.com",
      'artworks.thetvdb.com',
      'media.kitsu.io',
      'media.kitsu.app',
      'kitsu-production-media.s3.us-west-002.backblazeb2.com',
      'media.themoviedb.org'
    ],
    unoptimized: true
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ANILIST_CLIENT_ID: process.env.ANILIST_CLIENT_ID,
    ANILIST_CLIENT_SECRET: process.env.ANILIST_CLIENT_SECRET,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },

};

export default nextConfig;
