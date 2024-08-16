import { FaUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { motion } from "framer-motion"
import Link from "next/link";
import { signIn, signOut } from 'next-auth/react';

const Dropdown = ({ data, isLoggedIn }) => {
  return (
    <motion.div
      className="bg-[#17151e6f] backdrop-blur-2xl border-2 border-[#4844606e] absolute top-14 right-0 rounded-2xl overflow-hidden min-w-52 px-2 pt-4 pb-2 text-[14px]"
      style={{ transformOrigin: 'top right' }}
      initial={{ scale: "0.1 0.3" }}
      animate={{ scale: 1 }}

    >
      {
        isLoggedIn ? <>
          <div className="flex flex-col font-semibold ml-3 text-white">Signed in as <span>{data?.user?.name}</span></div>

          <Link
            className="flex items-center mt-2 gap-2 hover:bg-[#262232] rounded-xl px-2 py-2 text-slate-200 cursor-pointer"
            href={"/profile"}
          >
            <div><FaUser /></div>
            <div>Profile</div>
          </Link>

          <Link href={"/settings"} className="flex items-center gap-2 hover:bg-[#231f2f] rounded-xl px-2 py-2 text-slate-200 cursor-pointer">
            <div><IoMdSettings /></div>
            <div>Settings</div>
          </Link>
          <div className="flex items-center gap-2 hover:bg-[#351f23] rounded-xl px-2 py-2 text-slate-200 cursor-pointer" onClick={() => signOut('AniListProvider')}>
            <div><RxExit /></div>
            <div>Log Out</div>
          </div>
        </> :
          <>
            <div className="flex items-center gap-2 hover:bg-[#262232] rounded-xl px-2 py-2 mb-2 text-slate-200 cursor-pointer" onClick={() => signIn('AniListProvider')}>
              <div><RxExit /></div>
              <div>Sign in</div>
            </div>
            <Link href={"/settings"} className="flex items-center gap-2 hover:bg-[#231f2f] rounded-xl px-2 py-2 text-slate-200 cursor-pointer">
              <div><IoMdSettings /></div>
              <div>Settings</div>
            </Link>
          </>
      }

    </motion.div>
  )
}

export default Dropdown