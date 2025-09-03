import React, { useState } from 'react'
import SlideMenu from './SlideMenu';
import { HiOutlineMenuAlt1,HiOutlineX  } from 'react-icons/hi';

const Navbar = ({ activeMenu }) => {

  const [openSlideMenu, setOpenSlideMenu] = useState(false);

  

  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky pt-0'>
      <button className='block lg:hidden text-black'
      onClick={()=>{
        setOpenSlideMenu(!openSlideMenu);
      }}
      >
        {openSlideMenu ? (
          <HiOutlineX className='text-2xl'/>
        ) : (
          < HiOutlineMenuAlt1 className='text-2xl'/>
        )}

      </button>

      <h2 className='text-lg font-medium text-black pt-3'>Task Manager</h2>

      {
        openSlideMenu && (
          <div className='fixed top-[61px] -ml-4 bg-wite '>
            <SlideMenu activeMenu={activeMenu} />
          </div>
        )
      }
      
    </div>
  )
}

export default Navbar
