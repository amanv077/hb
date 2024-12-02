import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Ensure this middleware is implemented correctly
import {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidate.controller.js";

const router = express.Router();

// Register a new candidate (requires authentication)
router.route("/register").post(isAuthenticated, createCandidate);

// Get all candidates (no authentication required)
router.route("/").get(getCandidates);

// Get a candidate by ID (no authentication required for this action)
router.route("/:id").get(getCandidateById);

// Update candidate information (requires authentication)
router.route("/update/:id").put(isAuthenticated, updateCandidate);

// Delete a candidate by ID (requires authentication)
router.route("/delete/:id").delete(isAuthenticated, deleteCandidate);

export default router;
