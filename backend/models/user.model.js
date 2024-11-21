import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "recruiter"], required: true },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL to the uploaded resume
      resumeOriginalName: { type: String }, // Original file name of the resume
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: { type: String, default: "" }, // Profile photo URL
    },
    additionalInfo: {
      dob: { type: Date }, // Date of Birth
      gender: { type: String }, // Gender
      fatherName: { type: String },
      address: { type: String },
      state: { type: String },
      city: { type: String },
      totalWorkExp: { type: String }, // Total work experience
      highestQualificationCategory: { type: String },
      highestQualification: { type: String },
      highestQualificationPassedOn: { type: Number },
      highestQualificationPercentage: { type: Number },
      education: [
        {
          qualification: { type: String }, // e.g., Bachelor's, Master's
          institute: { type: String }, // Institute name
          passedOn: { type: Number }, // Year of passing
          percentage: { type: Number }, // Percentage/Grade
        },
      ],
      experience: [
        {
          workingStatus: { type: String }, // e.g., Currently Working, Already Left
          compName: { type: String }, // Company name
          industry: { type: String }, // Industry type
          designation: { type: String }, // Job title
          startDate: { type: Date }, // Start date
          endDate: { type: Date }, // End date (null if currently working)
        },
      ],
      candidate_summary: { type: String }, // Summary about the candidate
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
