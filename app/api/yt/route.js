import ytdl from '@distube/ytdl-core';
import { NextRequest, NextResponse } from 'next/server';

const getTrailer = async (id) => {
  const constructedUrl = ytdl.getURLVideoID(
    `https://www.youtube.com/watch?v=${id}`
  );

  const info = await ytdl.getInfo(constructedUrl);

  const video = info.formats
    .filter((e) => e.hasVideo && !e.isHLS && e.container === "webm" && e.codecs.includes("vp09"))
    .find((e) => e.quality === "hd1080")?.url;

  return video;
};

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 });
  }

  try {
    const url = await getTrailer(id);

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
