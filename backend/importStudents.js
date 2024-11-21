//push data into database

import mongoose from "mongoose";
import fs from "fs";
import Student from "./models/studentModel.js"; // Adjust path as necessary

// MongoDB connection string
const MONGO_URI =
  "mongodb+srv://amanverma4816:dWR1gzJbtpcbVnB2@cluster0.3udwd.mongodb.net/";

const setDefaultValues = (student) => {
  return {
    name: student.name || "Unknown",
    mobile: student.mobile || "0000000000",
    email: student.email || "unknown@example.com",
    dob: student.dob || "1900-01-01",
    gender: student.gender || "not specified",
    fatherName: student.fatherName || "Not Available",
    skills: Array.isArray(student.skills) ? student.skills : [],
    address: student.address || "Not Provided",
    state: student.state || "Unknown",
    city: student.city || "Unknown",
    totalWorkExp: parseInt(student.totalWorkExp, 10) || 0,
    highestQualificationCategory:
      student.highestQualificationCategory || "Not Specified",
    education: Array.isArray(student.education)
      ? student.education.map((edu) => ({
          qualification: edu.qualification || "Not Specified",
          institute: edu.institute || "Not Specified",
          passedOn: edu.passedOn || 0,
          percentage: parseFloat(edu.percentage) || 0,
        }))
      : [],
    highestQualification: student.highestQualification || "Not Specified",
    highestQualificationPassedOn:
      parseInt(student.highestQualificationPassedOn, 10) || 0,
    highestQualificationPercentage:
      parseFloat(student.highestQualificationPercentage) || 0,
    experience: Array.isArray(student.experience)
      ? student.experience.map((exp) => ({
          workingStatus: exp.workingStatus || "Not Specified",
          compName: exp.compName || "Unknown",
          industry: exp.industry || "Unknown",
          designation: exp.designation || "Not Specified",
          startDate: exp.startDate || "Not Specified",
          endDate: exp.endDate || "Not Specified",
        }))
      : [],
    candidate_summary: student.candidate_summary || "No Summary Available",
  };
};

// Function to import students
const importStudents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    // Read the JSON file
    const data = fs.readFileSync("./candidates.json", "utf-8"); // Ensure the file path is correct
    const students = JSON.parse(data);

    let successCount = 0;
    let errorCount = 0;

    for (const student of students) {
      try {
        // Sanitize the student data
        const sanitizedStudent = setDefaultValues(student);
        await Student.create(sanitizedStudent);
        successCount++;
      } catch (error) {
        // Log the error and continue
        console.error(`Failed to insert student: ${student.name || "Unknown"}`);
        console.error(error.message);
        errorCount++;
      }
    }

    console.log(`Student data import completed!`);
    console.log(`Successfully imported: ${successCount}`);
    console.log(`Failed to import: ${errorCount}`);

    // Close the connection
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("An error occurred while importing students:", error);
    process.exit(1); // Exit with failure code
  }
};

// Run the script
importStudents();
