import { CANDIDATE_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCandidate = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    current_location: "",
    gender: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    currentCTC: "",
    currentCompany: "",
    totalExperience: "",
    fieldOfExperience: "",
    yearsincurrentcompany: "",
    notice_period: "",
    highest_education: "",
    education: [{ college: "", course: "", year: "", marks: "" }],
    experience: [{ company: "", designation: "", ctc: "", from: "", to: "" }],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, field, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = e.target.value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addArrayField = (arrayName, defaultObj) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], defaultObj],
    });
  };

  const removeArrayField = (arrayName, index) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  const registerNewCandidate = async () => {
    try {
      const res = await axios.post(
        `${CANDIDATE_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        Navigate(`/admin/candidates/${res.data.candidate._id}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
      } else {
        console.log("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-black mb-6">Candidate Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-black"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-black"
              >
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Your Gender"
              />
            </div>
            <div>
              <label
                htmlFor="current_location"
                className="block text-sm font-medium text-black"
              >
                Current Location
              </label>
              <input
                type="text"
                name="current_location"
                value={formData.current_location}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Current Location"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-black"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-black"
              >
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter state"
              />
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-black"
              >
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pincode"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-black"
            >
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Enter full address"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="currentCTC"
                className="block text-sm font-medium text-black"
              >
                Current CTC (in ₹)
              </label>
              <input
                type="number"
                name="currentCTC"
                value={formData.currentCTC}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 800000"
              />
            </div>
            <div>
              <label
                htmlFor="currentCompany"
                className="block text-sm font-medium text-black"
              >
                Current Company
              </label>
              <input
                type="text"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., ABC Corp."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="totalExperience"
                className="block text-sm font-medium text-black"
              >
                Total Year Of experience
              </label>
              <input
                type="number"
                name="totalExperience"
                value={formData.totalExperience}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Total Years Of Experience"
              />
            </div>
            <div>
              <label
                htmlFor="fieldOfExperience"
                className="block text-sm font-medium text-black"
              >
                Field Of Experience
              </label>
              <input
                type="text"
                name="fieldOfExperience"
                value={formData.fieldOfExperience}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., ABC Corp."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="yearsincurrentcompany"
                className="block text-sm font-medium text-black"
              >
                Years In Current Company
              </label>
              <input
                type="number"
                name="yearsincurrentcompany"
                value={formData.yearsincurrentcompany}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 800000"
              />
            </div>
            <div>
              <label
                htmlFor="notice_period"
                className="block text-sm font-medium text-black"
              >
                Notice Period
              </label>
              <input
                type="text"
                name="notice_period"
                value={formData.notice_period}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., ABC Corp."
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-black mb-2">Education</h3>
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4"
              >
                <input
                  type="text"
                  placeholder="College Name"
                  value={edu.college}
                  onChange={(e) =>
                    handleArrayChange(e, index, "college", "education")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Course"
                  value={edu.course}
                  onChange={(e) =>
                    handleArrayChange(e, index, "course", "education")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    handleArrayChange(e, index, "year", "education")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Marks (%)"
                  value={edu.marks}
                  onChange={(e) =>
                    handleArrayChange(e, index, "marks", "education")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField("education", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addArrayField("education", {
                  college: "",
                  course: "",
                  year: "",
                  marks: "",
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Education
            </button>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-lg font-medium text-black mb-2">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4"
              >
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) =>
                    handleArrayChange(e, index, "company", "experience")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Designation"
                  value={exp.designation}
                  onChange={(e) =>
                    handleArrayChange(e, index, "designation", "experience")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="CTC"
                  value={exp.ctc}
                  onChange={(e) =>
                    handleArrayChange(e, index, "ctc", "experience")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  placeholder="From"
                  value={exp.from}
                  onChange={(e) =>
                    handleArrayChange(e, index, "from", "experience")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  placeholder="To"
                  value={exp.to}
                  onChange={(e) =>
                    handleArrayChange(e, index, "to", "experience")
                  }
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField("experience", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addArrayField("experience", {
                  company: "",
                  designation: "",
                  ctc: "",
                  from: "",
                  to: "",
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Experience
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={registerNewCandidate}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCandidate;
