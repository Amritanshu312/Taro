import axios from 'axios';
import { NextResponse } from 'next/server';


axios.interceptors.request.use(config => {
  config.timeout = 9000;
  return config;
});

const fetchStreamingData = async (episodeId) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/watch/${episodeId}`
    );

    if (data?.message === "Anime not found" && data?.length < 1) {
      return [];
    }

    return data;

  } catch (error) {
    return [];
  }
}

const fetchSkipTime = async (idMal, epNum) => {
  try {

    const { data } = await axios.get(
      `https://api.aniskip.com/v2/skip-times/${idMal}/${parseInt(epNum)}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`
    );

    return data;
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
    return [];
  }
}

export const GET = async (req, { params }) => {
  const url = new URL(req.url);
  const episodeId = params.animeid[0];
  const idMal = url.searchParams.get('idmal');
  const episode = url.searchParams.get('episode');

  console.log(idMal, episode);

  const [streamingData, skipTime] = await Promise.all([
    fetchStreamingData(episodeId),
    fetchSkipTime(idMal, episode)
  ]);

  const initialData = {
    url,
    idMal,
    episodeId,
    streamingData,
    skipTime
  };

  const response = NextResponse.json(initialData);
  response.headers.set('Cache-Control', 's-maxage=900, stale-while-revalidate=59');

  return response;
};
