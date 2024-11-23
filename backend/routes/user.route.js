import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  deleteUser,
  createUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

/**
 * @route   POST /api/v1/user/register
 * @desc    Register a new user with profile picture upload
 * @access  Public
 */
router.post("/register", singleUpload, register);

/**
 * @route   POST /api/v1/user/login
 * @desc    Login an existing user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/v1/user/logout
 * @desc    Logout the currently logged-in user
 * @access  Public (but typically used after authentication)
 */
router.get("/logout", logout);

/**
 * @route   POST /api/v1/user/profile/update
 * @desc    Update the authenticated user's profile
 * @access  Private (Requires Authentication)
 */
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

/**
 * @route   DELETE /api/v1/user/user/delete/:userId
 * @desc    Delete a user by ID (secured for authorized roles)
 * @access  Private (Requires Authentication, Role Validation Recommended)
 */
router.delete("/user/delete/:userId", isAuthenticated, deleteUser);

/**
 * @route   POST /api/v1/user/user/create
 * @desc    Create a new user (Admin or special use cases)
 * @access  Private (Requires Authentication, Role Validation Recommended)
 */
router.post("/user/create", isAuthenticated, createUser);

export default router;
