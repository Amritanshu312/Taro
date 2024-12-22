import { useWatchContext } from "@/context/Watch";
import { IoPlaySkipForward } from "react-icons/io5";


const NextSkip = ({ videoRef }) => {

  const { setEpisode } = useWatchContext();


  return (
    <div
      className="w-8 h-8 flex items-center justify-center text-xl duration-100 text-[#ffffffcd] cursor-pointer hover:text-[#fff] relative group "
      onClick={() => setEpisode(prev => prev + 1)}
    >
      <div className="w-max px-3 pointer-events-none right-1/2 translate-x-1/2 py-1 absolute text-sm bg-[#fafafa] font-['poppins'] text-[15px] text-[#131316] rounded-md group-hover:scale-100 group-hover:delay-500 group-hover:bottom-9 group-hover:opacity-100 bottom-0 opacity-0 scale-0 duration-200">
        Next Episode (n)
      </div>

      <span className="text-[22px]"><IoPlaySkipForward /></span>
    </div>
  )
}

export default NextSkip