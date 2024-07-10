export async function FetchYtVideoStream(videoID) {
  try {
    if (videoID) {
      const response = await fetch(
        `https://pipedapi.kavin.rocks/streams/${videoID}`
      );

      if (!response.ok) return "error";
      const res = await response.json();
      const item = res.videoStreams.find(
        (i) => i.quality === '1080p' && i.format === 'WEBM'
      );
      return item?.url || "error";
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
}