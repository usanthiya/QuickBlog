import React from "react";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { fetchDashboardStats } from "../../slice/dashboard.js";
import { deleteBlogById, togglePublish } from "../../api/blog.js";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const dispatch = useDispatch();
  const { title, createdAt, _id, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  const handlePublishToggle = async () => {
    try {
      const response = await togglePublish(_id, !isPublished);
      if (response.success) {
        toast.success(response.message || "Status updated successfully");
        if (fetchBlogs) fetchBlogs();
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
        if (fetchBlogs) fetchBlogs();
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
    <tr className="hover:bg-indigo-50/50 transition-colors duration-200">
      <th className="px-6 py-4 font-medium text-slate-700">{index}</th>
      <td className="px-6 py-4 font-medium text-slate-800">{title}</td>
      <td className="px-6 py-4 text-slate-500 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-6 py-4 max-sm:hidden">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isPublished ? "bg-green-100 text-green-700 border border-green-200" : "bg-amber-100 text-amber-700 border border-amber-200"}`}>
          {isPublished ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4 flex items-center gap-3">
        <button
          onClick={handlePublishToggle}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${isPublished ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"}`}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-all cursor-pointer"
          title="Delete Blog"
        >
          <Trash2 className="w-5 h-5 stroke-1" />
        </button>
      </td>
    </tr>
  )
};

export default BlogTableItem;
