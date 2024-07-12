import Image from "next/image"
import { AiFillLike } from "react-icons/ai";

const Recommendation = () => {
  return (
    <div className="w-full max-w-[24rem]">
      <div className="text-[#ffffffe0] text-[18px] font-medium font-['poppins'] mb-4">Recommendation</div>

      <div className="w-full">
        <div
          className="bg-[#242735] border-[1px] border-[#39374b] flex w-full overflow-hidden rounded-md">

          <Image
            src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg"}
            alt="Character"
            height={130}
            width={100}
            className={"object-cover h-full w-[80px]"}
          />

          <div className="w-full h-full flex flex-col items-center mx-2 my-2 max-w-[17rem]">

            <div className="flex flex-col gap-2">
              <div className="text-[#c4c7cc] text-[15px] font-medium overflow-hidden text-ellipsis line-clamp-2">One pieceOne pieceOne pieceOne pieceOne pieceOne pieceOne pieceOne pieceOne pieceOne piece</div>
              <div className="text-[#c4c7cc] text-[13px]  flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1"><AiFillLike /> 5.4 rating</div>
              <div className="text-[#c4c7cc] text-[13px]  flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1"><AiFillLike /> 5.4 rating</div>
            </div>

          </div>


        </div>
      </div>
    </div>
  )
}

export default Recommendation