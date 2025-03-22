export const filterEpisodes = (episodes, isSubSelected, loading) => {
  if (loading) return [];
  return episodes.filter(data => (isSubSelected ? data?.isSubbed : data?.isDubbed));
};

export const chunkEpisodes = (data, chunkSize) => {
  return data?.reduce((chunks, _, i) => {
    if (i % chunkSize === 0) chunks.push(data.slice(i, i + chunkSize));
    return chunks;
  }, []);
};
