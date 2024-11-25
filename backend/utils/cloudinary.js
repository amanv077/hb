import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Ensure .env file is loaded

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary
 * @param {String} filePath - The path or buffer of the file to upload
 * @param {String} folder - The folder name for organization in Cloudinary
 * @returns {Promise<Object>} - The Cloudinary response object
 */
export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const options = {
      folder, // Specify the folder in Cloudinary
      transformation: { quality: "auto", fetch_format: "auto" },
    };

    return await cloudinary.v2.uploader.upload(filePath, options);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(error.message || "Cloudinary upload failed");
  }
};

export default cloudinary;
