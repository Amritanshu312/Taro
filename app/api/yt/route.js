import ytdl from '@distube/ytdl-core';
import { NextRequest, NextResponse } from 'next/server';

const getTrailer = async (id, quality) => {
  const constructedUrl = ytdl.getURLVideoID(
    `https://www.youtube.com/watch?v=${id}`
  );

  const info = await ytdl.getInfo(constructedUrl);
  let video = null

  if (quality === "all") {
    video = info.formats
      .filter((e) => e.hasVideo && !e.isHLS)
  }

  else if (quality) {
    // if a quality is specfied then it will scrape all the quality realted to it
    video = info.formats
      .filter((e) => e.hasVideo && !e.isHLS && e.qualityLabel === quality)

  } else {
    video = info.formats
      .filter((e) => e.hasVideo && !e.isHLS && e.qualityLabel === "1080p")
      .find((e) => e.quality === "hd1080")?.url;
  }

  return video;
};

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');
  const quality = searchParams.get('q') || null;

  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 });
  }

  try {
    const url = await getTrailer(id, quality);

    return NextResponse.json({
      url,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: {
          message: error.message,
          name: error.name,
        },
      },
      { status: 500 }
    );
  }
};
