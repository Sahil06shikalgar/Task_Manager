import React from 'react';
import UI_img from '../../assets/Images/img-2.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Section */}
      <div className="w-screen h-[72vh] md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children} {/* This renders whatever is passed inside AuthLayout */}
      </div>

      {/* Right Section */}
      <div className="overflow-hidden md:flex w-[40vw] h-screen items-center justify-center">
        <img src={UI_img} alt="UI illustration" className="w-64 lg:w-[100%]" />
      </div>
    </div>
  );
};

export default AuthLayout;
