export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/watch/',
        '/catalog/',
        '/api/'
      ],
    },
    sitemap: 'https://taro-anime.vercel.app/sitemap.xml',
  }
}