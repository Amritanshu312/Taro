import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";


const Settings = () => {
  const [isToggled, setIsToggled] = useState(false)


  return (
    <div
      className="text-xl duration-100 text-[#ffffffcd] cursor-pointer hover:text-[#fff] relative"
    >


      <span className="text-[22px] w-8 h-8 flex items-center justify-center relative group" onClick={() => setIsToggled(prev => !prev)}>
        <IoSettingsSharp />
        <div className="w-max px-3 pointer-events-none right-1/2 translate-x-1/2 py-1 absolute text-sm bg-[#fafafa] font-['poppins'] text-[15px] text-[#131316] rounded-md group-hover:scale-100 group-hover:delay-500 group-hover:bottom-9 group-hover:opacity-100 bottom-0 opacity-0 scale-0 duration-200">
          Settings
        </div>
      </span>


      {isToggled && <motion.div initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className="w-[16rem] h-[18rem] rounded-md right-0 bg-[#0d0d0dbd] backdrop-blur-lg border-[#26252a] border-[2px] absolute bottom-10 scale-0">
          
      </motion.div>}

    </div>
  )
}

export default Settings