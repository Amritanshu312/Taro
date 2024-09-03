"use client"
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard"
import { getWatchProgress } from "@/utils/GetProgress"
import { Fragment, useEffect, useState } from "react"


const ContinueWatching = () => {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    const data = getWatchProgress(false)

    if (data) {
      setMappedData(data);
    }
  }, []);

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative py-6">

          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[15px] flex flex-col">
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">Continue Watching</h1>


            {mappedData.length < 1 ? null :
              <div className="mt-8 mb-24 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-3">
                {mappedData.map(data => (
                  <ContinueWatchingCard key={data.id} data={data} />
                ))}

                {(mappedData?.length < 4) ? Array.from({ length: 4 - mappedData?.length }).map((i, _) => <ContinueWatchingCard key={_} hidden />) : null}
              </div>
            }


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

export default ContinueWatching