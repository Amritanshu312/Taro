import Image from "next/image"
import { Fragment, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ResultItems = ({ data }) => {
  return (
    <div className="flex gap-[6px] w-full cursor-pointer transition-all hover:bg-[#242734]">
      <div className="px-2 py-[4px] flex gap-[6px] w-full">
        <Image
          src={data?.image}
          alt="Image"
          height={40}
          width={60}
          className="w-[54px] aspect-[9/13] object-cover cursor-pointer rounded-md"
        />

        <div className="flex flex-col gap-[10px]">
          <div className="text-[#efebebf2] font-['Poppins'] font-medium text-[15px] overflow-hidden text-ellipsis line-clamp-1">{data?.title?.english || data?.title?.romaji}</div>
          <div className="flex gap-[10px]">
            <div className="border border-[#ffffff86] text-[#ffffffab] rounded-md px-1 text-[12px] flex items-center justify-center">{data?.status}</div>
            <div className="flex gap-1 items-center text-[#ffffffab] text-[14px]"><FaStar /> {data?.rating / 10}</div>
            <div className="text-[#ffffffab] text-[14px]">{data?.type}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SearchResults = ({ searchValue }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchSearch = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/${searchValue}`)
      const dataJSON = await data.json()

      setData(dataJSON)
    }

    fetchSearch()
  }, [searchValue])

  return (
    <div className="bg-[#231f2c] rounded-md w-full absolute flex flex-col gap-2">
      {data?.results?.slice(0, 5)?.map((data, index) => <Fragment key={index}><ResultItems data={data} /></Fragment>)}
      {(data?.length === 0 && searchValue !== "") && <div>No result found</div>}
    </div>
  )
}

export default SearchResults