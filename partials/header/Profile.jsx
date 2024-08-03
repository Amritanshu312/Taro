"use client"
import Image from "next/image"
import Link from "next/link"
import { useSession, signIn, signOut } from 'next-auth/react';

const Profile = () => {
  return (
    <div onClick={() => signOut('AniListProvider')}>
      <div>sign out</div>
      {/* <Link href={"/profile"}> */}
      <Image src="/images/logo.png" alt="profile" width={50} height={50} onClick={() => signIn('AniListProvider')} />
      {/* </Link> */}
    </div>
  )
}

export default Profile