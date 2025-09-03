import React, {  useState } from 'react'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

const SelectDropDown = ({ options, onChange, value ,placeholder}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <>
     <button
  type="button"
  onClick={() => setIsOpen(!isOpen)}
    className="border text-sm border-gray-300 rounded-md text-center flex justify-between items-center w-[170px] p-1"

>
  {/* Selected value or placeholder */}
  <span>
    {value
      ? options.find((option) => option.value === value)?.label
      : placeholder}
  </span>

  {/* Chevron icon */}
  {isOpen ? (
    <LuChevronUp className="ml-2" />
  ) : (
    <LuChevronDown className="ml-2" />
  )}
</button>


      {/* {Dropdown Menu} */}
      {isOpen && (
        <div className='absolute w-full bg-white border border-slate-100 rounded-md shadow-lg'>
          {options.map((option) => (
            <div key={option.value} onClick={() => handleSelect(option.value)}
            className='px-2 py-2 hover:bg-slate-100 cursor-pointer '
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SelectDropDown
