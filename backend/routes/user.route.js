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

// Register a new user
router.route("/register").post(singleUpload, register);

// Login user
router.route("/login").post(login);

// Logout user
router.route("/logout").get(logout);

// Update user profile (requires authentication)
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);

// Delete a user by ID (can be secured based on roles)
router.route("/user/delete/:userId").delete(isAuthenticated, deleteUser);

// Create a new user (admin or special use case)
router.route("/user/create").post(isAuthenticated, createUser);

export default router;
