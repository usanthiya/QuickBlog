import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const result = { success: true, message: "Users fetched successfully", data: null };
  try {
    const users = await userModel.find({}).select('-password'); // exclude password
    result.data = users;
    return res.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const result = { success: true, message: "User updated successfully", data: null };
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    result.data = updatedUser;
    return res.json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.json({ success: false, message: error.message });
  }
};
