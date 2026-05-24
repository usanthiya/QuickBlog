import React from "react";
import { assets } from "../../assets/assets";
import { approveCommentAdmin, deleteCommentAdmin } from "../../api/admin.js";
import { toast } from "react-toastify";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blogId, _id, createdAt, isApproved, name, content } = comment;
  const BlogDate = new Date(createdAt);

  const handleApprove = async () => {
    try {
      const response = await approveCommentAdmin(_id);
      if (response.success) {
        toast.success(response.message || "Comment approved successfully");
        fetchComments();
      } else {
        toast.error(response.message || "Failed to approve comment");
      }
    } catch (error) {
      console.error("Error approving comment:", error);
      toast.error("Failed to approve comment");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const response = await deleteCommentAdmin(_id);
      if (response.success) {
        toast.success(response.message || "Comment deleted successfully");
        fetchComments();
      } else {
        toast.error(response.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blogId?.title || "Deleted Blog"}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <img 
              src={assets.tick_icon}  
              onClick={handleApprove}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Approve"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
                Approved
            </p>
          )}
          <img 
            src={assets.bin_icon} 
            onClick={handleDelete}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            alt="Delete"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
