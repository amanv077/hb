import React, { useState } from "react";
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
  const [preview, setPreview] = useState(false); // For preview modal
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex justify-center my-10 px-5">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Post a New Job
          </h1>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Inputs */}
              {[
                { label: "Job Title", name: "title", type: "text" },
                { label: "Requirements", name: "requirements", type: "text" },
                { label: "Salary", name: "salary", type: "number" },
                { label: "Location", name: "location", type: "text" },
                { label: "Job Type", name: "jobType", type: "text" },
                {
                  label: "Experience (years)",
                  name: "experience",
                  type: "number",
                },
                {
                  label: "Number of Positions",
                  name: "position",
                  type: "number",
                },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <Label>{label}</Label>
                  <Input
                    type={type}
                    name={name}
                    value={input[name]}
                    onChange={changeEventHandler}
                    className="w-full"
                    placeholder={`Enter ${label}`}
                  />
                  {errors[name] && (
                    <p className="text-red-600 text-sm">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Select Company */}
              {companies.length > 0 && (
                <div>
                  <Label>Select Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full">
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
              <div className="sm:col-span-2">
                <Label>Job Description</Label>
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

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-1/2"
                onClick={() => setPreview(true)}
              >
                Preview Job
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-blue-500 text-white"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Post Job"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Preview Job Post</h2>
            <ul className="space-y-2">
              {Object.entries(input).map(
                ([key, value]) =>
                  value && (
                    <li key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key}:</span>
                      <span>{value}</span>
                    </li>
                  )
              )}
            </ul>
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={() => setPreview(false)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJob;
