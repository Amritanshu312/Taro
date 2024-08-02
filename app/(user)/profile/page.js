import Animes from "@/content/profile/Animes"
import Banner from "@/content/profile/Banner/Banner"
import CategorySelector from "@/content/profile/CategorySelector"
import { Fragment } from "react"

const Page = () => {
  return (
    <Fragment>
      <Banner />

      <div>
        <CategorySelector />
        <Animes />
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[50%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-full"></div>
    </Fragment>
  )
}

export default Page