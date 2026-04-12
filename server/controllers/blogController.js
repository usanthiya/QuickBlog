import fs from "fs";
import imagekit from "../config/imageKit.js";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";

export const addBlog = async (req, res) => {
  const result = {
    sucess: true,
    message: "Blog added successfully",
    data: null,
  };

  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      throw new Error("Missing required fields");
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const fileName = `${imageFile.originalname}_${Date.now()}`;

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName,
      folder: "/blogs",
    });

    //Optimization through imageKit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto", // Auto compression
          format: "webp", // Convert to modern WebP format for better performance
          width: "1280", //width resizing for faster loading
        },
      ],
    });

    const image = optimizedImageUrl;

    await blogModel.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json(result);
  } catch (error) {
    console.log("Error in add blog", error.message);
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  const result = {
    success: true,
    message: "Blogs listed successfully",
    data: null,
  };
  try {
    const blogs = await blogModel.find({ isPublished: true });
    result.data = blogs;
    return res.json(result);
  } catch (error) {
    console.error("Error listing blogs: ", getAllBlogs);
    return res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  const result = {
    success: true,
    message: "Blog By Id returned successfully",
    data: null,
  };
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      throw new Error("Blog not Found!");
    }

    result.data = blog;
    return res.json(result);
  } catch (error) {
    console.error("Error getting blog: ", error);
    return res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  const result = {
    success: true,
    message: "Blog deleted successfully",
    data: null,
  };
  try {
    const { id } = req.params;
    const response = await blogModel.findByIdAndDelete(id);

    //Deleting all comments associated with the blog
    await commentModel.deleteMany({ blogId: id });

    if (!response) {
      throw new Error("Blog not found");
    }

    return res.json(result);
  } catch (error) {
    console.error("Error deleting blog: ", error);
    return res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async(req, res) => {
    const result = {
        success: true,
        message: "",
        data: null
    }
    try{
        const { id, isPublished } = req.body;
        const blog = await blogModel.findOneAndUpdate({ _id: id }, { isPublished }, { new: true });
        console.log("updated blog: ", blog)
        { isPublished == true ? result.message = "Blog published successfully": result.message = "Blog unpublished successfully"}
        result.data = blog;
        return res.json(result);
    }catch(error){
        console.error("Error in publish toggle: ", error);
        return res.json({ success: false, message: error.message});
    }
}

export const addComment = async (req, res) => {
  const result = {
    success: true,
    message: "Comment added for review",
    data: null
  }
  try{
    const { blogId, name, content } = req.body;

    if(!blogId || name || content){
      throw new Error("All fields are required");
    }

    const comment = await commentModel.create({ blogId, name, content});
    result.data = comment;
    return res.json(result);
  }catch(error){
    console.error("Error adding comment: ", error);
    res.json({ success: false, message: error.message});
  }
}

export const getBlogComments = async(req, res) => {
  const result = {
    success: true,
    message: "",
    data: null
  }
  try{
    const { blogId } = req.body;

    const comments = await commentModel.find({ blogId, isApproved: true }).sort({ createdAt: -1 });
    if(!comments){
      return res.json({ success: true, message: "No comments found for this Blog"})
    }
    result.data = comments;
    return res.json(result);
  }catch(error){
    console.error("Error getting blog comments: ", error);
    return res.json({ success: false, message: error.message });
  }
}
