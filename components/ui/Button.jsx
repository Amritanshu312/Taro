const Button = ({ icon, text }) => {
  return (
    <button className="flex gap-2 items-center text-white bg-[#0f152524] backdrop-blur-md px-4 py-1 rounded-md border-[2px] border-[#ffffff5b] mt-2">{icon} {text}</button>
  )
}

export default Button