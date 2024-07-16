"use client"
import { FaCheck } from "react-icons/fa";
import { motion } from 'framer-motion'

const Checkbox = ({ title, checkBoxItem, setCheckBoxItem, multipleSelect }) => {
  const handleCheckBoxChange = () => {
    if (multipleSelect) {
      if (checkBoxItem.includes(title)) {
        setCheckBoxItem(checkBoxItem.filter(item => item !== title));
      } else {
        setCheckBoxItem([...checkBoxItem, title]);
      }
    } else {
      setCheckBoxItem(title === checkBoxItem ? "" : title);
    }
  };


  return (
    <div className="flex gap-2 items-center cursor-pointer" onClick={() => handleCheckBoxChange()}>
      <div className="bg-[#1a1921] w-[20px] h-[20px] rounded-[3px] grid place-content-center text-[12px]" >
        {multipleSelect
          ? checkBoxItem.includes(title) && (
            <motion.div initial={{ fontSize: '14px' }} animate={{ fontSize: '12px' }}>
              <FaCheck />
            </motion.div>
          )
          : checkBoxItem === title && (
            <motion.div initial={{ fontSize: '14px' }} animate={{ fontSize: '12px' }}>
              <FaCheck />
            </motion.div>
          )
        }
      </div>
      <div className="text-[#ebebebdc] font-['poppins'] text-[16px]">{title}</div>
    </div>
  )
}

export default Checkbox