"use client"
import { useEffect, useState } from "react"
import AiringStatus from "./Airing"
import Genres from "./Genres"
import Search from "./Search"
import Season from "./Season"
import Types from "./Types"
import Year from "./Year"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Options = () => {
  const router = useRouter(), pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [season, setSeason] = useState("");
  const [airingStatus, setAiringStatus] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setSearch(searchParams.get('search') || "");
    setType(searchParams.get('type') || "");
    setSeason(searchParams.get('season') || "");
    setAiringStatus(searchParams.get('airing') || "");
    setGenres(searchParams.get('genres') ? JSON.parse(searchParams.get('genres')) : []);
  }, [searchParams]);



  const handleSubmit = () => {
    const params = [
      search && `search=${encodeURIComponent(search)}`,
      type && `type=${encodeURIComponent(type)}`,
      season && `season=${encodeURIComponent(season)}`,
      airingStatus && `airing=${encodeURIComponent(airingStatus)}`,
      genres.length > 0 && `genres=${encodeURIComponent(JSON.stringify(genres))}`
    ].filter(Boolean).join('&');

    router.push(`${pathname}${params ? `?${params}` : ''}`);
  };


  return (
    <div className="py-4 px-3 bg-[#242735] border-[1px] border-[#39374b] w-full h-max max-w-[20rem] text-white rounded-sm max-[780px]:max-w-full">
      <Search search={search} setSearch={setSearch} pathname={pathname} />
      <Types type={type} setType={setType} />
      <Season season={season} setSeason={setSeason} />
      <AiringStatus airingStatus={airingStatus} setAiringStatus={setAiringStatus} />
      <Genres genresitem={genres} setGenres={setGenres} />
      <Year />

      <div
        className="bg-[#1b1a23] text-center py-2 rounded-md mt-6 cursor-pointer font-['poppins'] hover:bg-[#22202d] transition-all"
        onClick={handleSubmit}
      >Filter</div>
    </div>
  )
}

export default Options