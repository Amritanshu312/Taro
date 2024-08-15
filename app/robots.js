export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/anime/', '/api/'],
    },
    sitemap: 'https://taro-anime.vercel.app/sitemap.xml',
  }
}