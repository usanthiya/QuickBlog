import React, { useRef, useState, useEffect } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { addBlog } from "../../api/blog"; 
import { toast } from "react-toastify";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateContent = () => {};

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a thumbnail image.");
      return;
    }

    const description = quillRef.current ? quillRef.current.root.innerHTML : "";
    const textContent = quillRef.current ? quillRef.current.getText().trim() : "";
    if (!textContent) {
      toast.error("Blog description cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "blog",
        JSON.stringify({
          title,
          subTitle,
          description,
          category,
          isPublished,
        })
      );

      const response = await addBlog(formData);

      if (response.success) {
        toast.success(response.message || "Blog added successfully");
        // Reset state
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setImage(null);
        setIsPublished(false);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(response.message || "Failed to add blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Type your blog title here..."
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          required
          placeholder="Type your blog sub title here..."
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4">Blog Desscription</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center hover:bg-primary/95 transition-all"
        >
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
