import { Job } from "../models/job.model.js";

// Admin posting a new job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id; // Admin ID

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Create new job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // Split requirements into an array
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({
      message: "Failed to create job.",
      success: false,
    });
  }
};

// Fetch all jobs (for students)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // Query with optional keyword search
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    // Find jobs and populate company details
    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select: "name logo location", // Only fetch relevant fields
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Failed to fetch jobs.",
      success: false,
    });
  }
};

// Fetch a specific job by ID (for students)
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find job by ID and populate applications and company details
    const job = await Job.findById(jobId)
      .populate({
        path: "company",
        select: "name logo location description",
      })
      .populate({
        path: "applications",
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({
      message: "Failed to fetch job.",
      success: false,
    });
  }
};

// Fetch jobs created by a specific admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    // Find jobs created by admin and populate company details
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
        select: "name logo location", // Only fetch relevant fields
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({
        message: "No jobs found for this admin.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    return res.status(500).json({
      message: "Failed to fetch jobs.",
      success: false,
    });
  }
};
