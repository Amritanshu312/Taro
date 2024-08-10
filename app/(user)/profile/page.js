
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route"
import Banner from "@/content/profile/Banner"
import CategoryMain from "@/content/profile/CategoryMain"
import { UserProfile } from "@/lib/AnilistUser"
import { redirect } from "next/navigation"
import { Fragment } from "react"

const Page = async () => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    redirect('/');
  }

  const data = await UserProfile(session?.user?.token, session?.user?.name);
  const { user, lists } = data;

  const watchedAnime = lists.find(item => item?.status === "COMPLETED")

  return (
    <Fragment>
      <Banner info={user} data={watchedAnime} />
      <CategoryMain lists={lists} user={user} watchedAnime={watchedAnime} />

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[50%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-full"></div>
    </Fragment>
  )
}

export default Page