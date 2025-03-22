import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const quality = searchParams.get('q') || null;

  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 });
  }

  try {
    // Dynamically import `@distube/ytdl-core`
    const ytdl = (await import('@distube/ytdl-core')).default;

    const constructedUrl = ytdl.getURLVideoID(
      `https://www.youtube.com/watch?v=${id}`
    );
    const info = await ytdl.getInfo(constructedUrl);

    let video = null;
    if (quality === "all") {
      video = info.formats.filter((e) => e.hasVideo && !e.isHLS);
    } else if (quality) {
      video = info.formats.filter(
        (e) => e.hasVideo && !e.isHLS && e.qualityLabel === quality
      );
    } else {
      video = info.formats
        .filter((e) => e.hasVideo && !e.isHLS && e.qualityLabel === "1080p")
        .find((e) => e.quality === "hd1080")?.url;
    }

    return NextResponse.json({ url: video });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: { message: error.message, name: error.name },
      },
      { status: 500 }
    );
  }
};
