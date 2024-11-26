import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use.", success: false });
    }

    let profilePhotoUrl = "";
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const uploadResponse = await cloudinary.uploader.upload(
          fileUri.content,
          {
            folder: "user_profiles",
            transformation: { quality: "auto", fetch_format: "auto" },
          }
        );
        profilePhotoUrl = uploadResponse.secure_url;
      } catch (err) {
        console.error("Error uploading profile photo:", err);
        return res
          .status(500)
          .json({ message: "Failed to upload profile photo.", success: false });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        profile: newUser.profile,
      },
      success: true,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({
        message: "An error occurred. Please try again.",
        success: false,
      });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ message: "Invalid email or password.", success: false });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "Role mismatch. Check your login credentials.",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        user,
        success: true,
      });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({
        message: "An error occurred. Please try again.",
        success: false,
      });
  }
};

// Logout a user
export const logout = (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully.",
    success: true,
  });
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, ...rest } = req.body;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    // Handle file uploads
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const uploadResponse = await cloudinary.uploader.upload(
          fileUri.content,
          {
            folder: "user_profiles",
          }
        );
        user.profile.profilePhoto = uploadResponse.secure_url;
      } catch (err) {
        console.error("File upload error:", err);
        return res
          .status(500)
          .json({ message: "Failed to upload photo.", success: false });
      }
    }

    // Update remaining fields in the `profile` object dynamically
    Object.keys(rest).forEach((key) => {
      if (rest[key]) user.profile[key] = rest[key];
    });

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res
      .status(500)
      .json({ message: "Failed to update profile.", success: false });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully.", success: true });
  } catch (err) {
    console.error("Delete user error:", err);
    return res
      .status(500)
      .json({ message: "Failed to delete user.", success: false });
  }
};

// Create a new user (admin functionality)
export const createUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({
        message: "User created successfully.",
        user: newUser,
        success: true,
      });
  } catch (err) {
    console.error("Create user error:", err);
    return res
      .status(500)
      .json({ message: "Failed to create user.", success: false });
  }
};
