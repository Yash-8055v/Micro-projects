import { User } from "../models/User.model.js";


export const listUsers = async (req, res) => {
  try {
    const users = await User.find({
  role: "user"
}).select("-password -refreshToken");


    return res.status(200).json({
      status: "success",
      
      users
    })
    
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Failed to fetch users"
    })
  }
}

export const changeUserRole = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const { role } = req.body;
    const adminId = req.user.userId; // from verifyToken

    // 1️ Validate role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid role",
      });
    }

    // 2️ Prevent self role change
    if (targetUserId === adminId) {
      return res.status(403).json({
        status: "failure",
        message: "You cannot change your own role",
      });
    }

    // 3️ Find user
    const user = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }

    // 4️ Update role
    user.role = role;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User role updated",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Failed to update user role",
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const adminId = req.user.userId; // from JWT

    // 1️ Prevent self-delete
    if (targetUserId === adminId) {
      return res.status(403).json({
        status: "failure",
        message: "You cannot delete your own account",
      });
    }

    // 2️ Find user
    const user = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }

    // 3️ Prevent deleting another admin
    if (user.role === "admin") {
      return res.status(403).json({
        status: "failure",
        message: "Cannot delete another admin",
      });
    }

    // 4️ Delete user
    await user.deleteOne();

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Failed to delete user",
    });
  }
};