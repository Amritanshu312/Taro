import { StreamingServers } from "@consumet/extensions";
import AnimeKai from "@consumet/extensions/dist/providers/anime/animekai";
import { NextResponse } from "next/server";

const fetchStreamingData = async (episodeId, isDub) => {
  try {
    if (!episodeId) {
      throw new Error("Invalid or missing episodeId");
    }

    const animekai = new AnimeKai();
    const data = await animekai.fetchEpisodeSources(
      episodeId,
      StreamingServers.MegaUp,
      !!isDub ? "dub" : "sub"
    );


    if (!data || (data.message === "Anime not found" && (!Array.isArray(data) || data.length < 1))) {
      console.warn(`No data found for episode ${episodeId}`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(`Error fetching streaming data for episode ${episodeId}:`, error.message);
    return [];
  }
};

export async function GET(req, { params }) {
  try {
    const episodeId = decodeURIComponent(req.nextUrl.searchParams.get("episodeid"))
    const isdub = req.nextUrl.searchParams.get("isdub");


    if (!episodeId) {
      return NextResponse.json({ error: "Episode ID is required" }, { status: 400 });
    }

    const data = await fetchStreamingData(episodeId, isdub);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error handling GET request:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch streaming data. Please try again later." },
      { status: 500 }
    );
  }
}
