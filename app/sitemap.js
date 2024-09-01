import { TrendingAnilist, Top100Anilist, SeasonalAnilist } from '@/lib/Anilistfunction';

export default async function sitemap() {
  const [trendingData, top100Data, seasonalData] = await Promise.all([
    TrendingAnilist(),
    Top100Anilist(),
    SeasonalAnilist(),
  ]);

  const generateSitemapEntries = (data) => data.map((anime) => ({
    url: `https://taro-anime.vercel.app/anime/info/${anime.id}`,
    lastModified: new Date(),
  }));

  const trending = generateSitemapEntries(trendingData);
  const top100 = generateSitemapEntries(top100Data);
  const seasonal = generateSitemapEntries(seasonalData);

  return [
    {
      url: 'https://taro-anime.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...trending,
    ...top100,
    ...seasonal,
  ];
}
