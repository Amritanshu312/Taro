import Image from "next/image"
import Link from "next/link";
import { IoLayers } from "react-icons/io5";

const HorizontalCard = ({ data }) => {

  return (
    <div
      className="bg-[#242735] border-[1px] border-[#39374b] flex w-full h-full overflow-hidden rounded-md relative items-center">

      <Image
        src={data?.coverImage?.large}
        alt="Character"
        height={130}
        width={100}
        className={"object-cover h-[106px] w-[80px] cursor-pointer"}
      />

      <div className="w-full h-full flex flex-col mx-2 my-2 max-w-[17rem]">

        <div className="flex flex-col gap-3 ">
          <Link href={`/watch/${data?.id}`} className="text-[#c4c7cc] text-[15px] font-medium overflow-hidden text-ellipsis line-clamp-2 hover:text-[#e4e5e8] transition-all cursor-pointer">{data?.title?.english || data?.title?.romaji}</Link>

          <div className="flex gap-[6px] text-[14px] text-[#c4c7ccce] items-center">
            <div className="flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1">{data?.format.length > 4 ? `${data?.format.slice(0, 1).toUpperCase()}${data?.format.slice(1).toLowerCase()}` : data?.format}</div>
            <div className="h-1 w-1 bg-[#ffffff94] rounded-full"></div>
            <div className="flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1"><IoLayers /> {data?.episodes} Episodes</div>
            <div className="h-1 w-1 bg-[#ffffff94] rounded-full"></div>
            <div className="flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1">{data?.status ? `${data?.status.slice(0, 1).toUpperCase()}${data?.status.slice(1).toLowerCase()}` : ''}</div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default HorizontalCard