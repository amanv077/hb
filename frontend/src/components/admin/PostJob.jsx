import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!input.title) newErrors.title = "Job title is required";
    if (!input.description) newErrors.description = "Description is required";
    if (!input.requirements)
      newErrors.requirements = "Requirements are required";
    if (!input.salary || isNaN(input.salary))
      newErrors.salary = "Valid salary is required";
    if (!input.location) newErrors.location = "Location is required";
    if (!input.jobType) newErrors.jobType = "Job type is required";
    if (!input.experience || isNaN(input.experience))
      newErrors.experience = "Experience in years is required";
    if (input.position <= 0)
      newErrors.position = "Number of positions must be greater than zero";
    if (!input.companyId) newErrors.companyId = "Please select a company";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form data
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center my-10 px-5">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Post a New Job
          </h1>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <Label>Job Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm">{errors.title}</p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <Label>Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.requirements && (
                  <p className="text-red-600 text-sm">{errors.requirements}</p>
                )}
              </div>

              {/* Salary */}
              <div>
                <Label>Salary</Label>
                <Input
                  type="number"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.salary && (
                  <p className="text-red-600 text-sm">{errors.salary}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && (
                  <p className="text-red-600 text-sm">{errors.location}</p>
                )}
              </div>

              {/* Job Type */}
              <div>
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.jobType && (
                  <p className="text-red-600 text-sm">{errors.jobType}</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <Label>Experience (in years)</Label>
                <Input
                  type="number"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.experience && (
                  <p className="text-red-600 text-sm">{errors.experience}</p>
                )}
              </div>

              {/* Positions */}
              <div>
                <Label>No of Positions</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.position && (
                  <p className="text-red-600 text-sm">{errors.position}</p>
                )}
              </div>

              {/* Company Selection */}
              {companies.length > 0 && (
                <div>
                  <Label>Select Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.companyId && (
                    <p className="text-red-600 text-sm">{errors.companyId}</p>
                  )}
                </div>
              )}
              {/* Description */}
              <div>
                <Label>Description</Label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Describe the job role"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              {loading ? (
                <Button className="w-full p-4 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please
                  wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full p-4 bg-blue-500 text-white rounded-lg"
                >
                  Post New Job
                </Button>
              )}
            </div>

            {/* Fallback Message for No Companies */}
            {companies.length === 0 && (
              <p className="text-center text-sm text-red-600 font-semibold">
                *Please register a company first before posting jobs
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
