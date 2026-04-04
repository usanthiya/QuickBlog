import { SECURITY_SECRET } from "../config/env.js";
import userModel from "../models/userModel.js";
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
    res.status(500).json({
        success: false,
        message: "Error in admin signup",
        error: error.message,
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

    if(!email || !password){
        throw new Error("Email and password are required");
    }

    const user = await userModel.findOne({ email });
    
    if(!user){
        throw new Error("Admin with this email does not exist. Please Signup first.");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch){
        throw new Error("Invalid password. Please try again.");
    }
   
    const token = jwt.sign({ id: user._id}, SECURITY_SECRET, { expiresIn : '7d'})
 
    result.data = { 
        token,
        user
    }

    return res.status(200).json(result);
   
  } catch (error) {
    console.log("Error in admin login", error.message);
    res.status(500).json({
        success: false,
        message: "Error in admin login",
        error: error.message,
    });
  }
};

