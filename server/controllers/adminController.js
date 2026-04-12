import { SECURITY_SECRET } from "../config/env.js";
import userModel from "../models/userModel.js";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const result = {
    success: true,
    message: "Admin signup successful",
    data: null,
  };
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      throw new Error("All fields are required");
    }

    const existingAdmin = await userModel.findOne({ email });
    if (existingAdmin) {
      throw new Error("Admin with this email already exists. Please Login.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in admin signup", error.message);
    res.json({
      success: false,
      message: error.message || "Error in admin signup",
    });
  }
};

export const login = async (req, res) => {
  const result = {
    success: true,
    message: "Admin login successful",
    data: null,
  };

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error(
        "Admin with this email does not exist. Please Signup first.",
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password. Please try again.");
    }

    const token = jwt.sign(
      { user: { id: user._id, name: user.name, email: user.email } },
      SECURITY_SECRET,
      { expiresIn: "7d" },
    );

    result.data = {
      token,
      user,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in admin login", error.message);
    res.json({
      success: false,
      message: error.message || "Error in admin login",
    });
  }
};

export const getAllBlogsAdmin = async(req, res) => {
  const result = {
    success: true,
    message: "Blogs listed successfully",
    data: null
  }
  try{
    const blogs = await blogModel.find({}).sort({ createdAt: -1});

    result.data = blogs;
    return res.json(result);
  }catch(error){
    console.error("Error listing all Blogs: ", error);
    res.josn({ success: false, message: error.message });
  }
}

export const getAllComments = async (req, res) => {
  const result = {
    success: true,
    message: "Comments listed successfully",
    data: null
  }
  try{
    const comments = await commentModel.find({}).populate("blogId").sort({ createdAt: -1 });

    result.data = comments;
    return res.json(result);
  }catch(error){
    console.error("Error listing all Comments: ", error);
    res.josn({ success: false, message: error.message });
  }
}

export const getDashboardData = async(req, res) => {
   const result = {
    success: true,
    message: "Dashborard Data listed successfully",
    data: null
  }
  try{
    const blogs = await blogModel.countDocuments({isPublished: true});
    const comments = await commentModel.countDocuments({isApproved: true});
    const drafts = await blogModel.countDocuments({isPublished: false});
    const recentBlogs = await blogModel.find({isPublished: true}).sort({createdAt: -1}).limit(5);

    result.data = {
      blogs, comments, drafts, recentBlogs
    }
    return res.json(result);
  }catch(error){
    console.error("Error in dashboard data: ", error);
    res.josn({ success: false, message: error.message });
  }
}