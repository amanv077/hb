import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  college: { type: String },
  course: { type: String },
  year: { type: String },
  marks: { type: String },
});

const ExperienceSchema = new mongoose.Schema({
  company: { type: String },
  designation: { type: String },
  ctc: { type: Number },
  from: { type: Date },
  to: { type: Date },
});

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  current_location: { type: String },
  gender: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  address: { type: String },
  totalExperience: { type: String },
  fieldOfExperience: { type: String },
  currentCTC: { type: Number },
  currentCompany: { type: String },
  yearsincurrentcompany: { type: Number },
  notice_period: { type: String },
  highest_education: { type: String },
  education: [EducationSchema],
  experience: [ExperienceSchema],
});

export const Candidate = mongoose.model("Candidate", CandidateSchema);
