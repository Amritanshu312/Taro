import Animes from "@/content/catalog/Animes"
import SortBy from "@/content/catalog/components/SortBy"
import Options from "@/content/catalog/options/Options"
import { Fragment } from "react"

const Page = () => {

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative">

          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[15px] flex justify-between items-center">
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">Catalog</h1>

            <SortBy />
          </div>

          <div className="flex gap-4 mt-4 mb-32 max-[780px]:flex-col">
            <Options />
            <Animes />
          </div>


        </div>
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
      <div>

      </div>
    </Fragment>
  )
}

export default Page