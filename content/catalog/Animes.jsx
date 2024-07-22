"use client"
import Card from "@/components/Cards/Card/Card";
import { AdvancedSearch } from "@/lib/Anilistfunction";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import Pagination from "./Pagination";

const Animes = () => {
  const searchParams = useSearchParams();

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdvanceSearch = useCallback(async () => {
    setLoading(true);

    const sort = searchParams.get("sort") || null;
    const search = searchParams.get("search") || "";
    let airing = searchParams.get("airing") || null;
    const genres = searchParams.get("genres") || null;
    let season = searchParams.get("season") || null;
    const type = searchParams.get("type") || null;
    const year = searchParams.get("year") || null;
    const page = searchParams.get("page") || 1;

    airing &&
      (airing = {
        Airing: "RELEASING",
        Finished: "FINISHED",
        "Not yet Aired": "NOT_YET_RELEASED",
        Cancelled: "CANCELLED",
      }[airing]);
    season && (season = season.toUpperCase());

    let genresData = null;
    if (genres) {
      try {
        const parsedGenres = JSON.parse(genres);
        if (Array.isArray(parsedGenres)) {
          genresData = { genres: parsedGenres };
        }
      } catch (error) {
        console.error("Error parsing genres:", error);
      }
    }

    if (sort) {
      try {
        const data = await AdvancedSearch(
          search,
          season,
          type,
          genresData,
          airing,
          sort,
          page
        );

        setAnimes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state (e.g., set error state)
      } finally {
        setLoading(false);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    fetchAdvanceSearch();
  }, [fetchAdvanceSearch]);

  const loadingCards = useMemo(() => Array.from({ length: 30 }).map((_, index) => <Card key={index} index={index} loading />), []);

  return (
    <div className="w-full">

      <div className="w-full h-full grid grid-auto-fit gap-3">
        {loading ? loadingCards : animes?.media?.map((item, index) => <Card data={item} key={index} />)}
        {(!loading && animes?.media?.length < 6) && Array.from({ length: 6 - animes?.media?.length }).map((_, index) => <Card key={index} index={index} hidden />)}
      </div>

      <div className="mt-8"></div>
      {animes?.pageInfo && animes?.media.length >= 30 ? <Pagination pageInfo={animes?.pageInfo} /> : null}


    </div>
  );
};

export default Animes;
