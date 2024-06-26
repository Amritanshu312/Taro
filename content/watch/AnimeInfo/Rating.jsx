import Image from "next/image"
import { IoStar } from "react-icons/io5"

const Rating = ({ info }) => {
  return (
    <div className="flex items-center mt-2 relative">

      <Image
        src="/images/waifus/2.png"
        alt="logo"
        width={200}
        height={300}
        className="object-cover absolute -top-20 -z-1 left-1/2 -translate-x-1/2"
      />

      <div className="bg-[#22212c] border border-[#39374b] rounded-2xl h-max p-4 flex flex-col items-center justify-center w-max relative z-10">
        <div className="flex gap-2">
          <span className="text-[#c7799f] text-2xl font-semibold">{info?.averageScore / 10}/10</span>
          <span className="text-[#717480] text-sm font-semibold">{info?.popularity} reviews</span>
        </div>

        <div className="flex items-center bg-[#333145] gap-2 text-[27px] rounded-lg px-4 py-1 mt-4 text-[#6a727f]">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>

        <div className="mt-3 text-[#858792] font-['poppins',_sans-serif] text-sm">Rate this anime or f**k u??</div>
      </div>

    </div>
  )
}

export default Rating