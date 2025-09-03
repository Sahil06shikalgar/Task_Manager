import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/usercontext';
import { useNavigate } from 'react-router-dom';
import { SLIDE_MENU_DATA, SLIDE_MENU_USER_DATA } from '../../utils/Data';

const SlideMenu = ({ activeMenu }) => {
  const { user, cleanuser } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setMenuItems(user.role === 'admin' ? SLIDE_MENU_DATA : SLIDE_MENU_USER_DATA);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    cleanuser();
    navigate('/login', { replace: true });
  };

  const handleClick = (route) => {
    if (route.toLowerCase().includes('logout')) {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center mb-7 pt-5'>
        <img
          src={user?.profileImageUrl || '/default-avatar.png'}
          alt="Profile"
          className='w-20 h-20 bg-slate-300 rounded-full'
        />
        {user?.role === 'admin' && (
          <span className='text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1'>
            Admin
          </span>
        )}
        <h5 className='text-gray-900 font-bold mt-3'>{user?.name || ''}</h5>
        <p className='text-[12px] text-gray-500'>{user?.email || ''}</p>
      </div>

      {menuItems.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-4 px-5 py-3 mb-3 rounded transition 
            ${activeMenu === item.label
              ? 'text-primary bg-blue-100 border-r-4 border-primary'
              : 'hover:bg-blue-50 hover:border-r-4 hover:border-primary'}
          `}
        >
          <item.icon className='text-xl' />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SlideMenu;
