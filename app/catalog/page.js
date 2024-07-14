import { Fragment } from "react"

const Page = () => {
  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative">

          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[20px]">
            <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">Catalog</h1>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Page