import Image from "next/image"

const Banner = () => {
  return (
    <div className="relative after:bg-[linear-gradient(360deg,#000000a6,transparent);] after:content-[''] after:w-full after:h-56 after:bottom-0 after:absolute ">
      <div className="relative w-full h-[21rem] border-b border-[#181821]">
        <Image
          src={"/images/banner.jpg"}
          alt="banner"
          loading='eager'
          priority={true}
          quality={100}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 right-1/2 translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-4">
          <Image src="/images/artworks-Xhbx2TzxHzrllTQR-kmD5OQ-t500x500.jpg" alt="profile" width={150} height={150} className="object-cover w-28 h-28 border-8 border-[#868a8e] rounded-full" />
          <div className="font-['poppins'] text-[#ffffff] text-2xl font-semibold">Mugiverse</div>
        </div>

        <div className="text-slate-100 flex gap-12 mt-2 mb-[26px]">

          <div className="flex flex-col items-center">
            <div className="font-semibold">23</div>
            <div className="font-['Rubik'] text-[15px] font-medium text-[#c86e8e]">Anime Watched</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-semibold">236</div>
            <div className="font-['Rubik'] text-[15px] font-medium text-[#c86e8e]">Anime Watched</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-semibold">2123</div>
            <div className="font-['Rubik'] text-[15px] font-medium text-[#c86e8e]">Anime Watched</div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Banner