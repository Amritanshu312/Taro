"use client"
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';


const Pagination = ({ pageInfo }) => {
  const [page, setPage] = useState(pageInfo?.currentPage)
  useEffect(() => {

  }, [page])
  const itemclass = "h-9 w-9 flex items-center justify-center rounded-md bg-[#242735] font-['poppins'] text-[15px] text-slate-200 cursor-pointer"
  return (
    <div className="w-full flex items-center justify-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaArrowRight />}
        onPageChange={() => setPage(page + 1)}
        pageRangeDisplayed={5}
        containerClassName="flex items-center gap-[4px]"
        pageLinkClassName={itemclass}
        breakClassName={itemclass}
        nextClassName={itemclass}
        previousClassName={itemclass}
        activeLinkClassName="bg-[#48455f]"
        pageCount={pageInfo?.lastPage}
        previousLabel={<FaArrowLeft />}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination