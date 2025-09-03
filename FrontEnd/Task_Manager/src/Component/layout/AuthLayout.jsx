import React from "react";
import UI_img from "../../assets/Images/img-2.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-[60%] px-6 sm:px-12 py-8 flex flex-col">
        <h2 className="text-lg font-medium text-black mb-6">Task Manager</h2>
        <div className="flex-1 flex items-center justify-center">{children}</div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-[40%] h-screen items-center justify-center bg-gray-50">
        <img
          src={UI_img}
          alt="UI illustration"
          className="w-64 lg:w-full object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
