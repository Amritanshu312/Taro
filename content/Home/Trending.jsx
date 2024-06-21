import TrendingCard from "@/components/TrendingCard/TrendingCard"
import { Fragment } from "react"

const Trending = ({ data }) => {
  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 max-[1270px]:bottom-0 max-[1270px]:mt-6 max-[1270px]:mb-8 ">
      <h1 className="text-[#ffffffbd] font-medium text-3xl font-['poppins'] max-[1270px]:text-2xl max-[1270px]:text-[#f6f4f4ea]">| Currently Trending</h1>


      <div className="mt-8 grid grid-auto-fit gap-3">
        {data.filter(item => item.trailer && item.trailer.id && item.id !== 21 && item.bannerImage !== null && item.status !== 'NOT_YET_RELEASED')?.slice(0, 8).map((item, index) => <Fragment key={index}>
          <TrendingCard info={item} />
        </Fragment>)}

      </div>
    </div>
  )
}

export default Trending