import ProfileCard from "@/components/Cards/ProfileCard/ProfileCard"
import { Fragment } from "react"

const Animes = ({ data }) => {
  return (
    <div className="h-full mt-6 mx-24 grid grid-auto-fit gap-[8px_20px]">
      {data?.entries?.map((data, index) => <Fragment key={index}><ProfileCard info={data} /></Fragment>)}
      {data?.entries.length < 9 && Array.from({ length: 9 - data?.entries.length })?.map((_, i) => <Fragment key={i}><ProfileCard hidden /></Fragment>)}
    </div>
  )
}

export default Animes