"use client"
import Image from "next/image"
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from "react";
import clsx from "clsx";
import Dropdown from "./Dropdown";


const Profile = () => {
  const { data, status } = useSession();

  const [isToggled, setIsToggled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

      <div onClick={() => setIsToggled(prev => !prev)}>
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
              { "h-12 w-12 rounded-lg object-cover cursor-pointer hover:rounded-2xl duration-100": isLoggedIn }
            )
          }
        />
      </div>

      {isToggled && <Dropdown data={data} isLoggedIn={isLoggedIn} />}


    </div>
  )
}

export default Profile