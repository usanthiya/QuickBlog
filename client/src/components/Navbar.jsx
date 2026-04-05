import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/authSlice";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  
  const handleLogout = async () => {
    dispatch(logout());
  }

  return (
    <div className="flex justify-between items-center py-5 mx-8 sx:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="QuickBlog Logo"
        className="w-32 sx:w-40 xl:w-48 cursor-pointer"
      />
      {token ? (
        <div className="relative">
          <img 
             src={assets.user_icon} 
             alt="profile" 
             className="w-10 h-10 rounded-full cursor-pointer bg-primary/10 p-2" 
             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
               <button
                  onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
               >
                  Admin Panel
               </button>
               <button
                  onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
               >
                  Logout
               </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 rounded-md text-sm bg-primary cursor-pointer text-white px-10 py-2.5"
        >
          Login
          <img src={assets.arrow} alt="arrow" className="w-3" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
