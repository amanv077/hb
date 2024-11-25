import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Check if all fields are provided
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "A user with this email already exists.",
        success: false,
      });
    }

    // Ensure a file is uploaded (if required)
    if (!req.file) {
      return res.status(400).json({
        message: "Profile photo is required.",
        success: false,
      });
    }

    // Process the file and upload to Cloudinary
    let cloudResponse;
    try {
      const fileUri = getDataUri(req.file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "user_profiles", // Optional: specify a folder in Cloudinary
        transformation: { quality: "auto", fetch_format: "auto" }, // Optimize image
      });
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({
        message: "Error uploading profile photo. Please try again.",
        success: false,
      });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url, // Save Cloudinary URL
      },
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
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific errors (e.g., validation, database, etc.)
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid data. Please check your input.",
        success: false,
      });
    }

    // General server error
    return res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
      success: false,
    });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the specified role.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during login.",
      success: false,
    });
  }
};

// Logout a user
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during logout.",
      success: false,
    });
  }
};

// Update a user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file; // Check if a file is uploaded (optional)
    const cloudResponse = file
      ? await cloudinary.uploader.upload(getDataUri(file).content) // Only upload if a file is provided
      : null;

    const skillsArray = skills ? skills.split(",") : null; // Split skills if provided
    const userId = req.id; // Middleware authentication to get userId

    let user = await User.findById(userId); // Fetch the user from the database
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Update user fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    // If a new resume is uploaded, update it
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname; // Store the original file name
    }

    await user.save(); // Save the updated user data

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile.",
      success: false,
    });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting the user.",
      success: false,
    });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User created successfully.",
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the user.",
      success: false,
    });
  }
};
