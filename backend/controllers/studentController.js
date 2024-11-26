import Student from "../models/studentModel.js";

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    if (!studentData.name || !studentData.email || !studentData.mobile) {
      return res.status(400).json({
        message: "Name, email, and mobile are required fields.",
        success: false,
      });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(studentData.email)) {
      return res.status(400).json({
        message: "Invalid email format.",
        success: false,
      });
    }

    const newStudent = await Student.create(studentData);

    return res.status(201).json({
      message: "Student created successfully.",
      student: newStudent,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the student.",
      success: false,
    });
  }
};

// Fetch all students with optional filters and pagination
export const getStudents = async (req, res) => {
  try {
    const {
      name,
      email,
      city,
      state,
      skills,
      mobile,
      experience,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};

    // Add filters to the query if provided
    if (name) filters.name = new RegExp(name.trim(), "i");
    if (email) filters.email = new RegExp(email.trim(), "i");
    if (city) filters.city = new RegExp(city.trim(), "i");
    if (state) filters.state = new RegExp(state.trim(), "i");
    if (mobile) filters.mobile = new RegExp(mobile.trim(), "i");

    // Handle skills filtering for mixed-case storage
    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      filters.skills = {
        $all: skillsArray.map((skill) => ({
          $regex: new RegExp(skill, "i"), // Case-insensitive regex for each skill
        })),
      };
    }

    // Handle experience as a numeric filter
    if (experience) {
      filters.totalWorkExp = { $gte: parseInt(experience, 10) };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    // Query the database with pagination
    const students = await Student.find(filters)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await Student.countDocuments(filters);
    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      message: "Students fetched successfully.",
      students,
      total,
      totalPages,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      message: "An error occurred while fetching students.",
      success: false,
    });
  }
};

// Get a specific student by ID
export const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Student fetched successfully.",
      student,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching the student.",
      success: false,
    });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const updateData = req.body;

    const student = await Student.findByIdAndUpdate(studentId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Student updated successfully.",
      student,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the student.",
      success: false,
    });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
        success: false,
      });
    }

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting the student.",
      success: false,
    });
  }
};
