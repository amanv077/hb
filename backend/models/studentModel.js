import mongoose from "mongoose";

// Define the schema
const studentSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  dob: Date,
  gender: String,
  fatherName: String,
  skills: [String],
  address: String,
  state: String,
  city: String,
  totalWorkExp: Number,
  highestQualificationCategory: String,
  education: [
    {
      qualification: String,
      institute: String,
      passedOn: Number,
      percentage: Number,
    },
  ],
  highestQualification: String,
  highestQualificationPassedOn: Number,
  highestQualificationPercentage: Number,
  experience: [
    {
      workingStatus: String,
      compName: String,
      industry: String,
      designation: String,
      startDate: String,
      endDate: String,
    },
  ],
  candidate_summary: String,
});

// Define the model
const Student = mongoose.model("Student", studentSchema);

// Reusable search function
export const searchStudents = async (filters) => {
  try {
    const query = {};

    // Handle case-insensitive keyword matching for simple fields
    if (filters.name) query.name = { $regex: filters.name, $options: "i" };
    if (filters.city) query.city = { $regex: filters.city, $options: "i" };
    if (filters.state) query.state = { $regex: filters.state, $options: "i" };

    // Use $elemMatch for array fields like experience
    if (filters.designation) {
      query.experience = {
        $elemMatch: {
          designation: { $regex: filters.designation, $options: "i" },
        },
      };
    }
    if (filters.company) {
      query.experience = query.experience || {};
      query.experience.$elemMatch = {
        ...query.experience.$elemMatch,
        compName: { $regex: filters.company, $options: "i" },
      };
    }

    // Match skills (if provided as a comma-separated string)
    if (filters.skills) {
      query.skills = {
        $all: filters.skills.split(",").map((skill) => skill.trim()),
      };
    }

    // Filter by minimum total work experience
    if (filters.experience) {
      query.totalWorkExp = { $gte: Number(filters.experience) };
    }

    // Execute query and return results
    const results = await Student.find(query);
    return results;
  } catch (error) {
    console.error("Error searching students:", error);
    throw new Error("Unable to fetch students");
  }
};

export default Student;
