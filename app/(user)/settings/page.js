import AllSettings from "@/content/settings/AllSettings"
import TypeSelector from "@/content/settings/TypeSelector"

const Page = () => {
  return (
    <div className="flex flex-col mx-96 z-10 relative top-[130px] text-white">

      <div className="flex gap-10">
        <TypeSelector />
        <AllSettings />
      </div>
    </div>
  )
}

export default Page