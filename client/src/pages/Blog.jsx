import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlog = async () => {
    const data = blog_data.find((blog) => blog._id === id);
    setData(data);
  };

  const fetchComments = async () => {
    setComments(comments_data);
  };

  const addComment =(event) => {
    event.preventDefault();
  }

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Michael Brown
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.title} className="rounded-3xl mb-5" />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto"
        ></div>
      </div>

      {/* Comments section */}
      <div className="mt-14 mb-10 mx-auto max-w-3xl">
        <p className="font-semibold mb-4">Comments ({comments.length})</p>
        <div className="flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} alt="User" className="w-6" />
                <p className="font-medium">{comment.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{comment.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {moment(comment.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add comments section */}
      <div className="max-w-3xl mx-auto">
        <p className="font-medium mb-4">Add your comment</p>
        <form
          onSubmit={addComment}
          className="flex flex-col items-start gap-4 max-w-lg"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <textarea
            placeholder="Comment"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded outline-none h-48"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded px-8 hover:scale-102 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Share Buttons */}
      <div className="my-24 max-w-3xl mx-auto">
        <p className="font-semibold my-4">Share this article on social media</p>
        <div className="flex">
           <img src={assets.facebook_icon} width={50} alt="" />
           <img src={assets.twitter_icon} width={50} alt="" />
           <img src={assets.googleplus_icon} width={50} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
