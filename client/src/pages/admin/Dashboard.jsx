import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { fetchDashboardStats } from "../../slice/dashboard.js";

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
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
 
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
           <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
               <tr>
                <th scope="col" className="px-2 py-4 xl:px-6"> # </th>
                <th scope="col" className="px-2 py-4"> Blog Title </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden"> Date </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden"> Status </th>
                <th scope="col" className="px-2 py-4"> Actions </th>
               </tr>
            </thead>
            <tbody>
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
