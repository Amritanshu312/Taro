import Link from "next/link"

const Button = ({ icon, text, animeID }) => {
  return (
    <Link href={`/watch/${animeID}`} className="flex w-max gap-2 items-center text-white bg-[#0f152524] backdrop-blur-md px-4 py-1 rounded-md border-[2px] border-[#ffffff5b] mt-2">{icon} {text}</Link>
  )
}

export default Button