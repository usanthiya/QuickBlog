import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { fetchDashboardStats } from "../../slice/dashboard.js";
import { FileText, MessageSquare, Edit3, Clock } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard: dashboardData, loading, error } = useSelector((state) => state.dashboard);
  
  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px] flex-1'>
         <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex-1 flex flex-col justify-center items-center my-20'>
        <p className='text-red-500'>Error: {error}</p>
        <button 
          onClick={() => dispatch(fetchDashboardStats())}
          className='mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all'>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-10 relative overflow-y-auto">
      {/* Stat Cards */}
      <div className="flex flex-wrap gap-6 mb-10">

        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-white/40 p-6 min-w-58 rounded-2xl shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer group">
          <div className="bg-indigo-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 opacity-80 text-indigo-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{dashboardData.blogs}</p>
            <p className="text-slate-500 font-medium tracking-wide">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-white/40 p-6 min-w-58 rounded-2xl shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer group">
          <div className="bg-indigo-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
             <MessageSquare className="w-8 h-8 opacity-80 text-indigo-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{dashboardData.comments}</p>
            <p className="text-slate-500 font-medium tracking-wide">Comments</p>
          </div>
        </div>
 
        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-white/40 p-6 min-w-58 rounded-2xl shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer group">
          <div className="bg-indigo-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
             <Edit3 className="w-8 h-8 opacity-80 text-indigo-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{dashboardData.drafts}</p>
            <p className="text-slate-500 font-medium tracking-wide">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Table */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-8 text-slate-700">
          <Clock className="w-6 h-6 text-slate-700" />
          <p className="text-lg font-semibold">Latest Blogs</p>
        </div>

        <div className="relative max-w-5xl overflow-hidden shadow-xl rounded-3xl bg-white/70 backdrop-blur-lg border border-white/50">
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
              {dashboardData.recentBlogs.map((blog, index)=> {
                return <BlogTableItem index={index+1} key={blog._id} blog={blog}/>
              })}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
