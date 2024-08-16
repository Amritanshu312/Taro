"use client"
import Account from "./TotalSettings/Account"
import Appearence from "./TotalSettings/Appearence"
import Preferences from "./TotalSettings/Preferences"


const AllSettings = ({ isLoggedIn, data }) => {
  return <div className="flex flex-col w-full ml-80">
    {isLoggedIn ? <Account isLoggedIn={isLoggedIn} data={data} /> : null}
    <Appearence />
    <Preferences />
  </div>
}

export default AllSettings