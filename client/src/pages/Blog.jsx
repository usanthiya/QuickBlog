import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { getBlogById, getBlogComments, addComment } from "../api/blog";
import { toast } from "react-toastify";
import { User } from "lucide-react";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlog = async () => {
    try {
      const response = await getBlogById(id);
      if (response.success) {
        setData(response.data);
      } else {
        toast.error(response.message || "Failed to load blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to load blog");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getBlogComments(id);
      if (response.success) {
        setComments(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await addComment({ blogId: id, name, content });
      if (response.success) {
        toast.success(response.message || "Comment submitted for review");
        setName("");
        setContent("");
      } else {
        toast.error(response.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
                <User className="w-5 h-5 text-gray-500" />
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
          onSubmit={handleAddComment}
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
        <div className="flex gap-4">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-10 h-10 cursor-pointer hover:scale-110 transition-all bg-blue-50 p-2 rounded-full"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                '_blank'
              )
            }
          />
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            className="w-10 h-10 cursor-pointer hover:scale-110 transition-all bg-blue-50 p-2 rounded-full"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(data.title)}`,
                '_blank'
              )
            }
          />
          <img
            src={assets.googleplus_icon}
            alt="LinkedIn"
            className="w-10 h-10 cursor-pointer hover:scale-110 transition-all bg-blue-50 p-2 rounded-full"
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                '_blank'
              )
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
