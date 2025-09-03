import React, { useContext } from 'react'
import Navbar from './Navbar'
import { UserContext } from '../../context/usercontext';
import SlideMenu from './SlideMenu';

const DashboardLayout = ({children, activeMenu}) => {

const { user } = useContext(UserContext);

  return (
    <div className='z-20'>

        <Navbar activeMenu={activeMenu} />

        {user && (
            <div className='flex'>
                <div className='max-[1080px]:hidden'>

                <SlideMenu activeMenu={activeMenu} />
                </div>

                <div className='grow mx-5'>{children}</div>

            </div>
        )}
      
    </div>
  )
}

export default DashboardLayout
