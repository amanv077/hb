import mongoose from "mongoose";

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

const Student = mongoose.model("Student", studentSchema);

export default Student; // Default export
