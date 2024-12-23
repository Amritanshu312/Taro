import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import { NextResponse } from "next/server";

const fetchStreamingData = async (episodeId, server) => {
  try {
    if (!episodeId) {
      throw new Error("Invalid or missing episodeId");
    }

    const anilist = new Anilist();
    const data = await anilist.fetchEpisodeSources(
      episodeId
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
    const episodeId = params?.episodeId;


    if (!episodeId) {
      return NextResponse.json({ error: "Episode ID is required" }, { status: 400 });
    }

    const data = await fetchStreamingData(episodeId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error handling GET request:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch streaming data. Please try again later." },
      { status: 500 }
    );
  }
}
