"use client"

import CatalogSelect from "@/components/ui/CatalogSelect"
import { useState } from "react"

const SortBy = () => {

  const [data, setData] = useState()


  return (
    <div>
      <span className="text-[#d7d7d797] text-sm">Sort by</span>

      <div className="w-full max-w-44">
        <CatalogSelect setSortBy={setData} />
      </div>
    </div>
  )
}

export default SortBy