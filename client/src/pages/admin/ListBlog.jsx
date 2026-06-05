import React, { useEffect, useState } from 'react'
import BlogTableItem from "../../components/admin/BlogTableItem";
import { getAllBlogsAdmin } from "../../api/admin";
import { toast } from "react-toastify";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogsAdmin();
      if (response.success) {
        setBlogs(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching admin blogs:", error);
      toast.error("Failed to load blogs. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 p-4 md:p-10 relative overflow-y-auto'>
       <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">All Blogs</h1>
       <div className="relative mt-4 max-w-5xl overflow-hidden shadow-xl rounded-3xl bg-white/70 backdrop-blur-lg border border-white/50">
           <table className="w-full text-sm text-slate-600">
            <thead className="text-xs text-slate-700 text-left uppercase bg-slate-100/50">
               <tr>
                <th scope="col" className="px-6 py-5 font-semibold"> # </th>
                <th scope="col" className="px-6 py-5 font-semibold"> Blog Title </th>
                <th scope="col" className="px-6 py-5 font-semibold max-sm:hidden"> Date </th>
                <th scope="col" className="px-6 py-5 font-semibold max-sm:hidden"> Status </th>
                <th scope="col" className="px-6 py-5 font-semibold"> Actions </th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60">
              {blogs.map((blog, index)=> {
                return <BlogTableItem index={index+1} key={blog._id} blog={blog} fetchBlogs={fetchBlogs}/>
              })}
            </tbody>
           </table>
        </div>
    </div>
  )
}

export default ListBlog
