import Image from "next/image"

const ProfileCard = ({ loading, hidden }) => {

  if (hidden) {
    return <div className="aspect-[9/14] relative rounded-xl cursor-pointer mb-2 overflow-hidden opacity-0"></div>
  }

  if (loading) {
    return (
      <div className="aspect-[9/14] relative rounded-xl cursor-pointer mb-2 overflow-hidden bg-[#22212c]">
        <div className="absolute bottom-[13px] left-[15px] z-10 w-full">
          <div className="w-[88%] h-4 bg-[#48465e] rounded-md"></div>
          <div className="w-[40px] h-3 bg-[#48465e] rounded-md mt-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-[9/14] relative rounded-md cursor-pointer mb-2 overflow-hidden">

      <div className="w-full h-full aspect-[9/14] after:content-[''] after:w-full after:h-[36%] after:absolute after:flex after:bg-[linear-gradient(360deg,#12111ab8,#0000)] after:left-0 after:bottom-0">
        <Image
          src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg"}
          alt="Trending"
          width={200}
          height={280}
          className="object-cover w-full h-full rounded-xl cursor-pointer aspect-[4/6] pointer-events-none "
        />
      </div>

      <div className="absolute bottom-[13px] left-[15px] text-white z-10">
        <div className="line-clamp-1 text-ellipsis overflow-hidden font-medium cursor-pointer transition-all hover:text-[#bca2e0]">tensungion kaisen of the work</div>
        <div className="text-sm text-[#c3c2c2be]">2022</div>
      </div>

    </div>
  )
}

export default ProfileCard