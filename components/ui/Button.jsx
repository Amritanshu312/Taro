const Button = ({ icon, text }) => {
  return (
    <button className="flex gap-2 items-center text-white bg-[#9d3cce1d] px-4 py-1 rounded-md border-[2px] border-[#cc3cce37] mt-2">{icon} {text}</button>
  )
}

export default Button