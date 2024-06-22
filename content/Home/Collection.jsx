import FeaturedCard from "@/components/Cards/featuredCard/FeaturedCard"
import { FaArrowRight } from "react-icons/fa6";

const Collection = () => {
  const data = [
    {
      text: "The best of ecchi",
      image: [
        "https://media.themoviedb.org/t/p/w220_and_h330_face/uTb2twGxJuJN0qdcz3yQQfIHOrN.jpg",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx148109-cwAINDGwAHB2.jpg",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130298-O7nR1Wrav2dH.jpg",
      ]
    },
    {
      text: "The best of romance",
      image: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9260-tbZARfVq8JoX.png",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/21650-qFjRMXrw1jku.jpg",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97863-79AXrUZ7VQa5.jpg",
      ]
    },
    {
      text: "The best of Shounen",
      image: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101302-7L0lcwYeFQQM.jpg",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-NuHM32a3VJsb.png",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171627-EzihNzljlKKs.jpg",
      ]
    }
  ]
  return (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">| Featured Collections</h1>

        <div className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition">See All <FaArrowRight /></div>
      </div>

      <div className="mt-8 mb-52 grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-3">
        {data.map((item, index) => <FeaturedCard key={index} data={item} />)}
      </div>


    </div>
  )
}

export default Collection