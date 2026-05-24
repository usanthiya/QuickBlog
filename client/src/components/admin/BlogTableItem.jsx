import React from "react";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { fetchDashboardStats } from "../../slice/dashboard.js";
import { deleteBlogById, togglePublish } from "../../api/blog.js";
import { toast } from "react-toastify";

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const dispatch = useDispatch();
  const { title, createdAt, _id, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  const handlePublishToggle = async () => {
    try {
      const response = await togglePublish(_id, !isPublished);
      if (response.success) {
        toast.success(response.message || "Status updated successfully");
        fetchBlogs();
        dispatch(fetchDashboardStats());
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error toggling publish:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const response = await deleteBlogById(_id);
      if (response.success) {
        toast.success(response.message || "Blog deleted successfully");
        fetchBlogs();
        dispatch(fetchDashboardStats());
      } else {
        toast.error(response.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
   <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4">{BlogDate.toDateString()}</td>
        <td className="px-2 py-4">
            <p className={`${isPublished ? "text-green-600" : "text-orange-700"}`}>
                {isPublished ? "Published" : "Unpublished"}
            </p>
        </td>
        <td className="px-2 py-4 flex text-xs gap-3">
            <button 
                onClick={handlePublishToggle}
                className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </button>
            <img 
                src={assets.cross_icon} 
                onClick={handleDelete}
                className="w-4 hover:scale-110 transition-all cursor-pointer" 
                alt="Delete" 
            />
        </td>
    </tr>
  ) 
};

export default BlogTableItem;
