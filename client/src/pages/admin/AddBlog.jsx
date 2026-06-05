import React, { useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addBlog } from "../../api/blog";
import { toast } from "react-toastify";
import { generateBlogAdmin } from "../../api/admin";

const AddBlog = () => {
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if (!title) {
      toast.error("Please enter a Blog Title first.");
      return;
    }

    try {
      setLoading(true);
      const response = await generateBlogAdmin(title);
      if (response.success && response.data) {
        setSubTitle(response.data.subtitle || "");
        const htmlContent = `
          <p><strong>Description:</strong> ${response.data.description || ""}</p>
          <br/>
          <div>${(response.data.body || "").replace(/\n/g, "<br/>")}</div>
        `;
        setDescription(htmlContent);
        toast.success(response.message || "Content generated successfully!");
      } else {
        toast.error(response.message || "Failed to generate content");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a thumbnail image.");
      return;
    }

    const textContent = description.replace(/<[^>]*>/g, "").trim();
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
        setDescription("");
        setCategory("Startup");
        setImage(null);
        setIsPublished(false);
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



  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-10 relative">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/50 text-slate-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Create New Blog
        </h2>

        <div className="mb-6">
          <label className="block font-medium text-slate-700 mb-2">Blog Title</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Type your blog title here..."
              className="flex-1 p-3 bg-slate-50 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={generateContent}
              disabled={loading}
              className="whitespace-nowrap text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-6 py-3 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "✨ Generate with AI"}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-medium text-slate-700 mb-2">Sub Title</label>
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            required
            placeholder="Type your blog sub title here..."
            className="w-full p-3 bg-slate-50 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-slate-700 mb-2">Blog Description / Body</label>
          <div className="border border-slate-200 rounded-xl bg-white shadow-sm">
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => setDescription(editor.getData())}
              config={{
                toolbar: {
                  items: [
                    "undo", "redo", '|',
                    "heading", "|",
                    "fontFamily", "fontSize", "fontColor", "fontBackgroundColor", "|",
                    "bold", "italic", "underline", "strikethrough", "subscript", "superscript", "code", "|",
                    "removeFormat", "|",
                    "alignment", "|",
                    "bulletedList", "numberedList", "todoList", "|",
                    "outdent", "indent", "|",
                    "link", "blockQuote", "insertTable", "imageUpload", "mediaEmbed", "horizontalLine", "|",
                  ],
                  shouldNotGroupWhenFull: true
                }
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-medium text-slate-700 mb-2">Blog Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm text-slate-600"
          >
            <option value="">Select category</option>
            {blogCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <p className="font-medium text-slate-700 mb-2">Upload Thumbnail</p>
          <label htmlFor="image" className="block w-max">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Thumbnail"
              className="h-20 w-32 object-cover rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all"
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
        </div>

        <div className="flex items-center gap-3 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-200 w-max shadow-sm">
          <p className="font-medium text-slate-700">Publish immediately?</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-5 h-5 cursor-pointer accent-indigo-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-10 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center text-lg"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
