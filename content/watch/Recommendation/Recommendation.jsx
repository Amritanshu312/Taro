import RecommendationCard from "@/components/Cards/HorizontalCard/HorizontalCard"
import { Fragment } from "react"



const Recommendation = ({ info }) => {
  const { recommendations: { nodes } } = info
  const recommendation = nodes.slice(0, 6)

  return (
    <div className="w-full min-[1125px]:max-w-[24rem]">
      <div className="text-[#ffffffe0] text-[18px] font-medium font-['poppins'] mb-4">Recommendation</div>

      <div className="w-full flex flex-col gap-3 max-[1125px]:grid max-[1125px]:grid-cols-[repeat(auto-fit,minmax(306px,1fr))]">
        {recommendation?.map((item, index) => <Fragment key={index}><RecommendationCard data={item?.mediaRecommendation} /></Fragment>)}

      </div>
    </div>
  )
}

export default Recommendation