import React, { useState, useEffect } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { getAllCommentsAdmin } from "../../api/admin";
import { toast } from "react-toastify";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const response = await getAllCommentsAdmin();
      if (response.success) {
        setComments(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 relative overflow-y-auto">
      <div className="flex justify-between items-center max-w-5xl mb-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-sm border rounded-full px-5 py-2 cursor-pointer text-sm font-medium transition-all ${filter === "Approved" ? "bg-indigo-100 text-indigo-700 border-indigo-200" : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"}`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-sm border rounded-full px-5 py-2 cursor-pointer text-sm font-medium transition-all ${filter === "Not Approved" ? "bg-indigo-100 text-indigo-700 border-indigo-200" : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative max-w-5xl overflow-hidden mt-4 bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl border border-white/50">
         <table className="w-full text-sm text-slate-600">
          <thead className="text-xs text-slate-700 text-left uppercase bg-slate-100/50">
            <tr>
              <th scope="col" className="px-6 py-5 font-semibold"> Blog Title & Comment</th>
              <th scope="col" className="px-6 py-5 font-semibold max-sm:hidden"> Date </th>
              <th scope="col" className="px-6 py-5 font-semibold"> Action </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60">
            {comments.filter((comment)=> {
              if(filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index)=> <CommentTableItem key={comment._id} comment={comment} index={index +1} fetchComments={fetchComments}/>)}
          </tbody>
         </table>
      </div>
    </div>
  );
};

export default Comments;
