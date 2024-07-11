import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


export const PaginationControls = ({ page, totalPages, next, prev }) => (
  <div className="flex justify-end mt-8 w-full">
    <div className="flex items-center bg-[#282a3a] h-[34px] rounded-lg">
      <div
        className="text-[#c4c7cc] px-6 border-r border-[#373b50] cursor-pointer"
        onClick={prev}
      >
        <FaArrowLeft />
      </div>
      <div className="text-[#c4c7cc] px-8">
        {page}-{totalPages} <span className="text-[#aeaeae]">of {totalPages}</span>
      </div>
      <div
        className="text-[#c4c7cc] px-6 border-l border-[#373b50] cursor-pointer"
        onClick={next}
      >
        <FaArrowRight />
      </div>
    </div>
  </div>
);