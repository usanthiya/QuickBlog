import jwt from "jsonwebtoken";
import { SECURITY_SECRET } from "../config/env.js";
import userModel from '../models/userModel.js';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authentication || req.headers.Authentication;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new error("Token is not provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = await jwt.verify(token, SECURITY_SECRET);
    const user = await userModel.findById(decoded.user.id)
    req.user = user;
    
    next();
  } catch (error) {
    console.error("Authentication error: ", error)
    res.send({
      sucess: false,
      message: "User is not authorized or token is invalid",
    });
  }
};

export default auth;
