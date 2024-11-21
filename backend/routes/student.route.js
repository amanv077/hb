import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes for student operations
// Create a new student and Get all students (with optional filters and pagination)

// router.route("/register").post(isAuthenticated, getStudents);
// router.route("/get").get(isAuthenticated, getStudents);
// router.route("/get/:id").get(isAuthenticated, getStudentsById);
// router.route("/update/:id").put(isAuthenticated, singleUpload, updateStudents);

router
  .route("/")
  .post(isAuthenticated, createStudent) // Create a new student
  .get(isAuthenticated, getStudents); // Get all students (with optional filters and pagination)

// Get a specific student by ID, Update a student by ID, Delete a student by ID
router
  .route("/students/:studentId")
  .get(isAuthenticated, getStudentById) // Get a specific student by ID
  .put(isAuthenticated, updateStudent) // Update a student by ID
  .delete(isAuthenticated, deleteStudent); // Delete a student by ID

export default router;
