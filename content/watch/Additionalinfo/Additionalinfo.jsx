import Characters from "./Characters"

const Additionalinfo = ({ info }) => {
  return (
    <div className="mt-8 mb-64 w-full">
      <div className="text-white flex w-full relative gap-2">
        <div className="px-[16px] py-[8px] text-[18px] font-medium relative after:content-[''] after:absolute after:w-full after:bottom-0 after:left-0 after:h-[3px] after:bg-[#8c8c8e] after:rounded-md after:transition-all hover:after:w-full after:z-10 cursor-pointer">Characters</div>
        <div className="px-[16px] py-[8px] text-[18px] font-medium relative after:content-[''] after:absolute after:w-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-[#8c8c8e] after:rounded-md after:transition-all hover:after:w-full after:z-10 cursor-pointer">Related</div>
        <div className="px-[16px] py-[8px] text-[18px] font-medium relative after:content-[''] after:absolute after:w-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-[#8c8c8e] after:rounded-md after:transition-all hover:after:w-full after:z-10 cursor-pointer">Comments</div>

        {/* small line */}
        <div className="w-full h-[1px] absolute bg-[#212029] bottom-[1px]"></div>
      </div>

      <Characters info={info} />
    </div>
  )
}

export default Additionalinfo