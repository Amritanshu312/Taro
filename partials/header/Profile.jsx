"use client"
import Image from "next/image"
import Link from "next/link"
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RxExit } from "react-icons/rx";

const Profile = () => {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }, [status])

  console.log(data);

  return (
    <div className="relative">

      <div
        onClick={
          () => {
            isLoggedIn ? router.push("/profile") : signIn('AniListProvider')
          }
        }
      >
        <Image
          src={
            isLoggedIn
              ? data?.user?.image?.medium || data?.user?.image?.large || "/images/logo.png"
              : "/images/logo.png"
          }
          alt="profile"
          width={50}
          height={50}
          className={
            clsx(
              {
                "h-12 w-12 rounded-lg object-cover cursor-pointer hover:rounded-2xl duration-100": isLoggedIn
              }
            )
          }
        />
      </div>

      <div className="bg-[#17151e6f] backdrop-blur-2xl border-2 border-[#4844606e] absolute top-14 rounded-2xl overflow-hidden min-w-52 px-2 pt-4 pb-2 text-[14px]">
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
      </div>
    </div>
  )
}

export default Profile