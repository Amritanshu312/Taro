import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Custom404() {
  return (
    <>

      <div className="flex flex-col items-center w-full px-52 max-[1460px]:px-[5rem] max-[1250px]:px-[3rem]">
        <div className="w-full max-w-[96rem] h-screen flex items-center justify-between">
          <div className="max-[700px]:w-full">
            <div className="flex w-full h-[3px] rounded-[25%] bg-[linear-gradient(45deg,#dac17b,#5bccbd,#70759e)]"></div>
            <div className="text-6xl text-[#eeeeee] font-['poppins'] mt-6 font-medium max-[700px]:text-center">404</div>

            <div className="w-full h-[2px] bg-[#ffffff1f] my-4"></div>

            <div className="text-[#ffffffc2] w-full max-[700px]:flex max-[700px]:justify-center">
              <div className="max-w-[28rem] max-[700px]:text-center">You&apos;ve unlocked a hidden path, but it leads to nowhere. Let&apos;s get you back on track!</div>
            </div>
            {/* <div className="text-[#ffffffc2]">This page has gone Super Saiyan and disappeared!</div> */}

            <div className="w-full max-[700px]:flex max-[700px]:justify-center max-[700px]:mt-4">
              <button className="w-max h-max mt-5 hover:bg-slate-900 duration-100 text-white px-4 py-2 backdrop-blur-md text-[14px] border-[1px] border-[#ffffff4b] rounded-xl flex gap-2 items-center">Back To Homepage <span className="mt-[3px]"><FaArrowRight /></span></button>
            </div>

          </div>
          <div className="relative mt-4">
            <Image src={"/images/waifus/praise samuri.png"} width={400} height={600} alt="waifu" className="-scale-x-[1] max-[990px]:-scale-x-[0.8] max-[990px]:scale-y-[0.8] max-[700px]:hidden" />
            <div className="bg-[linear-gradient(0deg,#12111a,#12111a17,transparent)] w-full h-32 absolute bottom-0 left-0"></div>
          </div>
        </div>
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[88.33px] h-[82.25px] left-[8%] bottom-[10%] bg-[#27e5ef] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-full"></div>
    </>
  )
}