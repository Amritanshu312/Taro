import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion"
import useScreenDimensions from "@/hook/useScreenDimensions";
import { FaCirclePlay } from "react-icons/fa6";

const InfoWindow = ({ info, hoverdata }) => {
  const { width: screenWidth } = useScreenDimensions()


  return (
    <motion.div
      animate={{ opacity: 1, }}
      className="w-[300px] opacity-0 absolute z-40 rounded-2xl backdrop-blur-[50px] border-2 border-[#ffffff17] p-4 top-[85%] translate-y-[-50%] bg-[#4c79af21]"
      style={{ left: hoverdata?.clientX + 492 > screenWidth ? "-155%" : "102%" }}
    >
      <h1 className="text-[20px] text-[#ffffffd4] font-medium w-full max-w-[60rem] tracking-normal overflow-hidden text-ellipsis line-clamp-1 font-['Poppins'] max-[794px]:text-3xl">{info?.title?.english}</h1>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <div className="text-yellow-400 flex items-center gap-2 h-full "><IoStar /> <span className="text-white">{info?.averageScore / 10}</span></div>

          <div className="text-white flex items-center gap-1">
            <div className="bg-[#fffeac] text-slate-800 font-medium px-1 rounded-tl-md rounded-bl-md">HD</div>
            <div className="bg-[#7fe57b] text-slate-800 font-medium px-1 rounded-tr-md rounded-br-md flex">{info?.episodes}</div>
          </div>
        </div>

        <div className="bg-[#83ffeb] text-slate-800 font-medium px-1 rounded-md">{info?.format}</div>
      </div>

      <div className="text-[#ffffff85] text-[14px] font-['poppins'] mt-2 overflow-hidden text-ellipsis line-clamp-3">{info?.description?.replace(/<[^>]*>/g, '')}</div>

      <div className="text-[#ffffff85] text-[15px] font-['poppins'] mt-2">
        <div><span className="text-[#ffffffd8]">Aired: </span> <span>{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"][info?.startDate?.month]} {info?.startDate?.day}, {info?.startDate?.year}</span></div>
        <div><span className="text-[#ffffffd8]">Status: </span> <span>{info?.status}</span></div>
        <div><span className="text-[#ffffffd8]">Genres: </span> <span>{info?.genres.join(', ')} </span></div>
      </div>

      <button className="text-white bg-[#73d8c730] w-full h-10 rounded-2xl mt-4 border-2 border-[#73d8c730] flex items-center justify-center gap-2"><FaCirclePlay /> Watch Now</button>
    </motion.div>
  )
}

export default InfoWindow