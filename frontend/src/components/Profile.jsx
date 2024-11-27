import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Check } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    dob: user?.profile?.dob || "",
    gender: user?.profile?.gender || "",
    fatherName: user?.profile?.fatherName || "",
    address: user?.profile?.address || "",
    state: user?.profile?.state || "",
    city: user?.profile?.city || "",
    totalWorkExp: user?.profile?.totalWorkExp || "",
    highestQualificationCategory:
      user?.profile?.highestQualificationCategory || "",
    highestQualification: user?.profile?.highestQualification || "",
    highestQualificationPassedOn:
      user?.profile?.highestQualificationPassedOn || "",
    highestQualificationPercentage:
      user?.profile?.highestQualificationPercentage || "",
    skills: user?.profile?.skills?.join(", ") || "",
    education: user?.profile?.education || [],
    experience: user?.profile?.experience || [],
    candidate_summary: user?.profile?.candidate_summary || "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        input,
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage
              src={
                user?.profile?.profilePhoto ||
                "https://via.placeholder.com/150?text=Avatar"
              }
              alt="Profile Picture"
            />
          </Avatar>
          <div className="flex-1">
            {isEditing ? (
              <Input
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
                placeholder="Full Name"
              />
            ) : (
              <h1 className="text-2xl font-bold">
                {user?.fullname || "No Name"}
              </h1>
            )}
            <p className="text-gray-600 mt-2">
              {isEditing ? (
                <Input
                  name="bio"
                  value={input.bio}
                  onChange={handleChange}
                  placeholder="Add a short bio..."
                />
              ) : (
                user?.profile?.bio || "No bio available"
              )}
            </p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-4 py-2 text-white rounded-lg shadow ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEditing ? (
              <Check className="w-5 h-5" />
            ) : (
              <Pen className="w-5 h-5" />
            )}
            {isEditing ? "Save Changes" : "Edit"}
          </Button>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              {isEditing ? (
                <Input
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              ) : (
                <p>{user?.email || "No email provided"}</p>
              )}
            </div>
            <div>
              <Label>Phone Number</Label>
              {isEditing ? (
                <Input
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              ) : (
                <p>{user?.phoneNumber || "No phone number provided"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Gender</Label>
              {isEditing ? (
                <Input
                  name="gender"
                  value={input.gender}
                  onChange={handleChange}
                  placeholder="Gender"
                />
              ) : (
                <p>{user?.profile?.gender || "Not specified"}</p>
              )}
            </div>
            <div>
              <Label>Date of Birth</Label>
              {isEditing ? (
                <Input
                  name="dob"
                  value={input.dob}
                  onChange={handleChange}
                  type="date"
                />
              ) : (
                <p>{user?.profile?.dob || "Not specified"}</p>
              )}
            </div>
            <div>
              <Label>Father's Name</Label>
              {isEditing ? (
                <Input
                  name="fatherName"
                  value={input.fatherName}
                  onChange={handleChange}
                  placeholder="Father's Name"
                />
              ) : (
                <p>{user?.profile?.fatherName || "Not specified"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Education and Work Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Education Section */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Education</h2>
            {user?.profile?.education?.length > 0 ? (
              user.profile.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-bold">{edu.qualification || "N/A"}</p>
                  <p>{edu.institute || "N/A"}</p>
                  <p>
                    {edu.passedOn || "N/A"}, {edu.percentage || "N/A"}%
                  </p>
                </div>
              ))
            ) : (
              <p>No education details available.</p>
            )}
          </div>

          {/* Work Experience Section */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Work Experience</h2>
            {user?.profile?.experience?.length > 0 ? (
              user.profile.experience.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-bold">{exp.designation || "N/A"}</p>
                  <p>{exp.compName || "N/A"}</p>
                  <p>
                    {exp.startDate || "N/A"} - {exp.endDate || "Present"}
                  </p>
                </div>
              ))
            ) : (
              <p>No work experience details available.</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          {isEditing ? (
            <Input
              name="skills"
              value={input.skills}
              onChange={handleChange}
              placeholder="Comma-separated skills"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
