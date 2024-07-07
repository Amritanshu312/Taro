export async function CombineEpisodeMeta(episodeData, imageData) {
  const episodeImages = {};

  imageData.forEach((image) => {
    episodeImages[image.number || image.episode] = image;
  });

  for (const providerEpisodes of episodeData) {
    const episodesArray = Array.isArray(providerEpisodes.episodes)
      ? providerEpisodes.episodes
      : [...(providerEpisodes.episodes.sub || []), ...(providerEpisodes.episodes.dub || [])];

    for (const episode of episodesArray) {
      const episodeNum = episode.number;
      if (episodeImages[episodeNum]) {
        const img = episodeImages[episodeNum].img || episodeImages[episodeNum].image;
        let title;
        if (typeof episodeImages[episodeNum]?.title === 'object') {
          const en = episodeImages[episodeNum]?.title?.en;
          const xJat = episodeImages[episodeNum]?.title?.['x-jat'];
          title = en || xJat || `EPISODE ${episodeNum}`;
        } else {
          title = episodeImages[episodeNum]?.title || '';
        }

        const description = episodeImages[episodeNum].description || episodeImages[episodeNum].overview || episodeImages[episodeNum].summary;
        Object.assign(episode, { img, title, description });
      }
    }
  }

  return episodeData;
}