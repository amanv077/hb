import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!req.id) {
      return res.status(401).json({
        message: "User authentication required",
        success: false,
      });
    }

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    const newCompany = await Company.create({
      name: companyName,
      userId: req.id, // Use authenticated user's ID
    });

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: newCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompany = async (req, res) => {
  console.log("DeleteCompany Endpoint");
  try {
    const companyId = req.params.id;

    // Check if companyId is valid
    if (!companyId) {
      return res.status(400).json({
        message: "Company ID is required.",
        success: false,
      });
    }

    // Find the company by ID and delete it
    const company = await Company.findByIdAndDelete(companyId);

    // If company not found, return an error
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteCompany:", error); // Log error for debugging
    return res.status(500).json({
      message: "An error occurred while deleting the company.",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    // idhar cloudinary ayega
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
