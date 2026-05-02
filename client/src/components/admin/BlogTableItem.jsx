import React from "react";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { fetchDashboardStats } from "../../slice/dashboard.js";

const BlogTableItem = ({ blog, index }) => {
  const dispatch = useDispatch();
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  return (
   <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4">{BlogDate.toDateString()}</td>
        <td className="px-2 py-4">
            <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>
                {blog.isPublished ? "Published" : "Unpublished"}
            </p>
        </td>
        <td className="px-2 py-4 flex text-xs gap-3">
            <button 
                onClick={() => dispatch(fetchDashboardStats())}
                className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
            >
                {blog.isPublished ? "Unpublish" : "Publish"}
            </button>
            <img 
                src={assets.cross_icon} 
                onClick={() => dispatch(fetchDashboardStats())}
                className="w-4 hover:scale-110 transition-all cursor-pointer" 
                alt="Delete" 
            />
        </td>
    </tr>
  ) 
};

export default BlogTableItem;
