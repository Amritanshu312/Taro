import Image from "next/image"

const AnimeInfo = ({ info }) => {
  return (
    <div className="text-white flex gap-6">
      <Image
        src={info?.coverImage?.extraLarge}
        alt="Taro"
        width={215}
        height={300}
        className="rounded-2xl object-cover h-80 w-[38rem]"
      />
      <div className="mt-2">
        <h1 className="text-2xl font-['poppins'] font-medium">{info?.title?.english}</h1>
        <div className="flex gap-2 mt-1 mb-2">
          <span className="bg-[#727587] text-[13px] px-1 rounded-[4px] text-slate-900 font-medium">HD</span>
          <span className="bg-[#727587] text-[13px] px-1 rounded-[4px] text-slate-900 font-medium">SD</span>
        </div>

        <p className="text-[15px] font-['poppins'] text-[#fff4f4b1] overflow-hidden text-ellipsis line-clamp-4 mb-2">{info?.description?.replace(/<[^>]*>/g, '')}</p>

        <div className="flex gap-32 justify-between max-[960px]:flex-col max-[960px]:gap-0">
          <div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Type: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.format}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Country: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.countryOfOrigin}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Premiered: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"][info?.startDate?.month]} {info?.startDate?.day}, {info?.startDate?.year}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Date aired: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.seasonYear}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Season: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.season}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Status: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.status}</span></div>
          </div>
          <div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Genres: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.genres.join(", ")}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Episodes: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.episodes}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Studios: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.studios?.nodes?.map((studio) => studio?.name).join(", ")}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Rating: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.averageScore / 10}</span></div>
            <div className="text-sm text-[#dadada] font-['poppins'] mt-[2px]">Duration: <span className="text-[#e26bbcd9] cursor-pointer hover:text-[#ff3df9]">{info?.duration} m</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeInfo