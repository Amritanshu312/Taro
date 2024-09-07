"use client"
import AllSettings from "@/content/settings/AllSettings"
import TypeSelector from "@/content/settings/TypeSelector"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import UnderConstruction from "@/components/errors/UnderConstruction";


const Page = () => {
  // const { data, status } = useSession();
  // const [isLoggedIn, setIsLoggedIn] = useState(false)


  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     setIsLoggedIn(true);
  //   }
  //   else {
  //     setIsLoggedIn(false);
  //   }
  // }, [status])

  return (
    <UnderConstruction />
    // <div className="flex flex-col z-10 relative top-[130px] text-white">

    //   <div className="flex mx-96 relative">
    //     <TypeSelector isLoggedIn={isLoggedIn} />
    //     <AllSettings isLoggedIn={isLoggedIn} data={data} />
    //   </div>
    // </div>
  )
}

export default Page