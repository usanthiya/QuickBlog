import React from "react";
import { assets } from "../../assets/assets";
import { approveCommentAdmin, deleteCommentAdmin } from "../../api/admin.js";
import { toast } from "react-toastify";
import { Check, Trash2 } from "lucide-react";

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
    <tr className="hover:bg-indigo-50/50 transition-colors duration-200">
      <td className="px-6 py-5 text-sm">
        <div className="mb-2">
          <span className="font-semibold text-slate-700">Blog:</span>{" "}
          <span className="text-slate-600">{blogId?.title || "Deleted Blog"}</span>
        </div>
        <div className="mb-1">
          <span className="font-semibold text-slate-700">Name:</span>{" "}
          <span className="text-slate-600">{name}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-700">Comment:</span>{" "}
          <span className="text-slate-600 italic">"{content}"</span>
        </div>
      </td>
      <td className="px-6 py-5 max-sm:hidden text-slate-500 font-medium">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-5">
        <div className="inline-flex items-center gap-3">
          {!isApproved ? (
            <button
              onClick={handleApprove}
              title="Approve Comment"
              className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 hover:scale-105 transition-all cursor-pointer shadow-sm border border-green-100"
            >
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs border border-green-200 bg-green-100 text-green-700 font-medium rounded-full px-3 py-1 shadow-sm">
              Approved
            </span>
          )}
          <button
            onClick={handleDelete}
            title="Delete Comment"
            className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 hover:scale-105 transition-all cursor-pointer shadow-sm border border-red-100"
          >
            <Trash2 className="w-5 h-5 stroke-1" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
