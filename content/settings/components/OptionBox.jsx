import Switch from "./Switch"

const OptionBox = ({
  title,
  description,
  ischecked,
  setischecked
}) => {
  return (
    <div className="flex justify-between items-center bg-[#22212c] mt-8 rounded-lg py-10 h-min w-full px-8">

      <div className="my-3">
        <p className="text-xl font-['poppins'] font-bold text-white mb-2">{title}</p>
        <p className="max-w-[20rem] text-base font-['poppins'] text-[#ffffffb3]">{description}</p>
      </div>

      <Switch isChecked={ischecked} setIsChecked={setischecked} />
    </div>
  )
}

export default OptionBox