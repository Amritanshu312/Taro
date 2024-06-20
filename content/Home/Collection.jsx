import FeaturedCard from "@/components/featuredCard/FeaturedCard"
import { FaArrowRight } from "react-icons/fa6";

const Collection = () => {
  return (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins']">| Featured Collections</h1>

        <div className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition">See All <FaArrowRight /></div>
      </div>

      <div className="mt-8 mb-52 grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-3">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
      </div>


    </div>
  )
}

export default Collection