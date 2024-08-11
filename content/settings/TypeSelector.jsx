import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5"
import { FaBrush } from "react-icons/fa6";
import { BiLogoPlayStore } from "react-icons/bi";
import { IoMdLink } from "react-icons/io";

const TypeSelector = () => {
  const types = [
    {
      name: "Account",
      icon: <IoPersonOutline />
    },
    {
      name: "Appearance",
      icon: <FaBrush />
    },
    {
      name: "Preferences",
      icon: <IoSettingsOutline />
    },
    {
      name: "Watch Page",
      icon: <BiLogoPlayStore />
    },
    {
      name: "App Information",
      icon: <IoMdLink />
    },
  ]
  return (
    <div className="max-w-72 w-full">
      <div className="text-[#ffffffbe] font-['poppins'] font-semibold">Settings</div>

      <div className="flex flex-col gap-2 mt-2">
        {types.map((d, _) => (
          <div key={_} className="flex gap-2 items-center text-[16px] font-medium py-3 px-2 rounded-md cursor-pointer hover:bg-[#282635de]">
            <div className="text-2xl">{d?.icon}</div>
            <div className="font-['poppins']">{d?.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TypeSelector