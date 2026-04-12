import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../slice/blogSlice';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const dispatch = useDispatch();
  const { blogs, categories, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
         <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center my-20'>
        <p className='text-red-500'>Error: {error}</p>
        <button 
          onClick={() => dispatch(fetchBlogs())}
          className='mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all'>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {categories?.map((item)=> (
            <div key={item} className='relative'>
                <button onClick={() => setMenu(item)}
                  className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 py-0.5'}`}>
                    {item}
                    {menu === item && (
                        <motion.div  layoutId='underline'
                        transition={{ type: 'spring', stiffness: 500, damping: 30}}
                        className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'/>
                    )}
                </button>
            </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {/* Blog cards */}
        {blogs?.length > 0 ? (
          blogs
            .filter((blog) => menu === 'All' ? true : blog.category === menu)
            .map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div className='col-span-full text-center text-gray-500'>No blogs found.</div>
        )}
      </div>
    </div>
  )
}

export default BlogList
