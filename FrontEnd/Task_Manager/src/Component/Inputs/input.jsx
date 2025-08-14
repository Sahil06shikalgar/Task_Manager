import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, placeholder, type, value, onChange }) => {


    const [showPassword, setShowPassword] = useState(false);

    const toggleshowpassword=() => {
        setShowPassword(!showPassword);
    }

  return (
    <div>
      <label className='text-[13px] text-slate-800 '>{label}</label>
      <div className='input-box'>
        <input type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'} placeholder={placeholder} value={value} 
        className='w-full bg-transparent outline-none '
        onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
          {showPassword ? (<FaRegEyeSlash 
          size={22}
            className="text-primary cursor-pointer"
            onClick={toggleshowpassword}

          />) : (<FaRegEye 
          size={22}
            className="text-slate-400 cursor-pointer"
            onClick={toggleshowpassword}
          />)}
        </>
      )}
      </div>
    </div>
  )
}

export default Input
