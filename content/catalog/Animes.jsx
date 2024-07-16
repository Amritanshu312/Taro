"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

const Animes = () => {
  const searchParams = useSearchParams()
  const [animes, setAnimes] = useState("loading")


  const search = searchParams.get('search') || "";
  const airing = searchParams.get('airing') || "";
  const genres = searchParams.get('genres') || "";
  const season = searchParams.get('season') || "";
  const type = searchParams.get('type') || "";
  const year = searchParams.get('year') || "";





  return (
    <div className="w-full h-full bg-red-700">
      fdsgsdfg
    </div>
  )
}

export default Animes