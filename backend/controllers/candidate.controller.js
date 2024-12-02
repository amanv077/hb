import { Candidate } from "../models/candidate.model.js";

// Create a new candidate
export const createCandidate = async (req, res) => {
  try {
    const { name, number, email, ...rest } = req.body;

    if (!name || !number || !email) {
      return res.status(400).json({
        message: "Name, number, and email are required fields.",
        success: false,
      });
    }

    const candidate = await Candidate.create({
      name,
      number,
      email,
      ...rest,
    });

    return res.status(201).json({
      message: "Candidate created successfully.",
      candidate,
      success: true,
    });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return res.status(500).json({
      message: "An error occurred while creating the candidate.",
      success: false,
    });
  }
};
// Get all candidates with optional pagination, sorting, and filtering
export const getCandidates = async (req, res) => {
  try {
    // Extract query parameters for filtering, sorting, and pagination
    const { page = 1, limit = 10, sort = "name", filter = "" } = req.query;

    // Build filter object for candidates based on the filter query
    const filterOptions = filter
      ? {
          $or: [
            { name: { $regex: filter, $options: "i" } },
            { currentCompany: { $regex: filter, $options: "i" } },
            { city: { $regex: filter, $options: "i" } },
          ],
        }
      : {};

    // Pagination and sorting logic
    const skip = (page - 1) * limit;
    const candidates = await Candidate.find(filterOptions)
      .skip(skip)
      .limit(Number(limit))
      .sort({ [sort]: 1 }); // Sorting based on the 'sort' field in ascending order

    // Get the total number of candidates to calculate total pages
    const totalCandidates = await Candidate.countDocuments(filterOptions);
    const totalPages = Math.ceil(totalCandidates / limit);

    return res.status(200).json({
      success: true,
      candidates,
      totalCandidates,
      totalPages,
      currentPage: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).json({
      message: "An error occurred while fetching candidates.",
      success: false,
    });
  }
};

// Get a candidate by ID
export const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found.",
        success: false,
      });
    }

    return res.status(200).json({
      candidate,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching candidate by ID:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the candidate.",
      success: false,
    });
  }
};

// Update a candidate
export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const candidate = await Candidate.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Candidate updated successfully.",
      candidate,
      success: true,
    });
  } catch (error) {
    console.error("Error updating candidate:", error);
    return res.status(500).json({
      message: "An error occurred while updating the candidate.",
      success: false,
    });
  }
};

// Delete a candidate
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findByIdAndDelete(id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Candidate deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the candidate.",
      success: false,
    });
  }
};
