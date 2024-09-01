import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Custom404() {
  return (
    <div className="mx-52 max-w-[96rem] h-screen flex items-center justify-between">
      <div>
        <div className="flex w-full h-[3px] rounded-[25%] bg-[linear-gradient(45deg,#dac17b,#5bccbd,#70759e)]"></div>
        <div className="text-6xl text-[#eeeeee] font-['poppins'] mt-6 font-medium">404</div>

        <div className="w-full h-[2px] bg-[#ffffff1f] my-4"></div>

        <div className="text-[#ffffffc2] max-w-[28rem]">You&apos;ve unlocked a hidden path, but it leads to nowhere. Let&apos;s get you back on track!</div>
        {/* <div className="text-[#ffffffc2]">This page has gone Super Saiyan and disappeared!</div> */}

        <button className="w-max h-max mt-5 hover:bg-slate-900 duration-100 text-white px-4 py-2 backdrop-blur-md text-[14px] border-[1px] border-[#ffffff4b] rounded-xl flex gap-2 items-center">Back To Homepage <span className="mt-[3px]"><FaArrowRight /></span></button>
      </div>
      <div className="relative mt-4">
        <Image src={"/images/waifus/praise samuri.png"} width={400} height={600} alt="waifu" className="-scale-x-[1]" />
        <div className="bg-[linear-gradient(0deg,#12111a,#12111a17,transparent)] w-full h-32 absolute bottom-0 left-0"></div>
      </div>
    </div>
  )
}