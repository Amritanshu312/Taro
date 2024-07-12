import { FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#242735b3] border-t-[1px] border-[#39374b] text-[.9rem] text-[#bac1cd] w-full h-16 flex items-center justify-between px-[12rem]">

      <div>Taro does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</div>
      <div className="flex items-center gap-2">Made with <FaHeart /> for Manga Lovers</div>

    </div>
  )
}

export default Footer