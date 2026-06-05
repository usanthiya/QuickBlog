import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { LayoutDashboard, PlusCircle, List, MessageCircle } from "lucide-react";

const Sidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-300 hover:bg-white/50 ${
      isActive
        ? 'bg-white/80 border-r-4 border-indigo-500 text-indigo-700 font-medium shadow-sm'
        : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <div className="flex flex-col border-r border-white/40 bg-white/30 backdrop-blur-md min-h-full pt-6 shadow-sm z-10">
      <NavLink end={true} to="/admin" className={navLinkClasses}>
        <LayoutDashboard className="min-w-4 w-5 opacity-80" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink to="/admin/addBlog" className={navLinkClasses}>
        <PlusCircle className="min-w-4 w-5 opacity-80" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>

      <NavLink to="/admin/listBlog" className={navLinkClasses}>
        <List className="min-w-4 w-5 opacity-80" />
        <p className="hidden md:inline-block">Blog lists</p>
      </NavLink>

      <NavLink to="/admin/comments" className={navLinkClasses}>
        <MessageCircle className="min-w-4 w-5 opacity-80" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
