import { useEffect, useState } from "react"
import OptionBox from "../components/OptionBox"
import Title from "../components/Title"

const Appearence = () => {
  const [featuredSection, setFeaturedSection] = useState(false)
  const [continueWatchingSection, setContinueWatchingSection] = useState(false)

  useEffect(() => {
    const jsonifiedLocalsotrage = JSON.parse(localStorage.getItem("setting.Taro") || '{}')

    if (jsonifiedLocalsotrage?.appearence) {
      if (jsonifiedLocalsotrage?.appearence?.featuredSection) setFeaturedSection(jsonifiedLocalsotrage?.appearence?.featuredSection === true || false)
      if (jsonifiedLocalsotrage?.appearence?.continueWatchingSection) setContinueWatchingSection(jsonifiedLocalsotrage?.appearence?.continueWatchingSection === true || false)
    }
  }, [])

  useEffect(() => {
    const jsonifiedLocalsotrage = JSON.parse(localStorage.getItem("setting.Taro") || '{}')

    localStorage.setItem("setting.Taro", JSON.stringify({
      ...jsonifiedLocalsotrage, appearence: {
        featuredSection,
        continueWatchingSection
      }
    }))
  }, [featuredSection, continueWatchingSection])

  return (
    <div className="mt-10">
      <Title title={"Appearence"} />

      <div>
        <OptionBox
          title={"Featured Anime"}
          description={"Do you want to show featured anime section in the homepage. if yes then toggle it on else toggle it off."}
          ischecked={featuredSection}
          setischecked={setFeaturedSection}
        />

        <OptionBox
          title={"Continue Watching"}
          description={"Do you want to show Continue Watching section in the homepage. if yes then toggle it on else toggle it off."}
          ischecked={continueWatchingSection}
          setischecked={setContinueWatchingSection}
        />
      </div>
    </div>
  )
}

export default Appearence