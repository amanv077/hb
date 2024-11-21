import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Ensure this middleware is correctly implemented
import {
  deleteCompany,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js"; // Ensure the multer middleware is set up correctly for file uploads

const router = express.Router();

// Register a new company
router.route("/register").post(isAuthenticated, registerCompany);

// Get all companies of the authenticated user
router.route("/get").get(isAuthenticated, getCompany);

// Get company by ID
router.route("/get/:id").get(isAuthenticated, getCompanyById);

// Update company info (with file upload)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

// Delete company by ID
router.route("/companies/:id").delete(isAuthenticated, deleteCompany);

export default router;
