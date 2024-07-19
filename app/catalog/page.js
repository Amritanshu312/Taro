import Animes from "@/content/catalog/Animes"
import SortBy from "@/content/catalog/components/SortBy"
import Options from "@/content/catalog/options/Options"
import Pagination from "@/content/catalog/Pagination"
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

          <div className="flex gap-4 mt-4">
            <Options />
            <Animes />
          </div>

          {/* <Pagination /> */}

        </div>
      </div>
    </Fragment>
  )
}

export default Page