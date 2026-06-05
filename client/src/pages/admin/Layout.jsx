import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { logout } from "../../slice/authSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-white/40 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <img
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-40 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        />
        <button 
          className="text-sm px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full cursor-pointer hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all font-medium tracking-wide"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
      <div className="flex min-h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
