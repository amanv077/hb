import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [expandSkills, setExpandSkills] = useState(false);
  const [expandExperience, setExpandExperience] = useState(false);
  const [expandEducation, setExpandEducation] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const profileImage =
    user?.profile?.profilePhoto ||
    "https://via.placeholder.com/150?text=Avatar"; // Fallback image

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8 mt-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage src={profileImage} alt="Profile Picture" />
            </Avatar>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {user?.fullname || "No Name"}
              </h1>
              <p className="text-sm text-gray-600">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          {/* Edit Profile Button */}
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm md:text-base shadow-md hover:bg-blue-600"
          >
            <Pen className="h-4 w-4 md:h-5 md:w-5" />
            <span>Edit Profile</span>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-gray-500" />
            <span>{user?.email || "No email provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-gray-500" />
            <span>{user?.phoneNumber || "No phone number provided"}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandSkills(!expandSkills)}
          >
            <h2 className="text-lg font-medium text-gray-800">Skills</h2>
            {expandSkills ? <ChevronUp /> : <ChevronDown />}
          </div>
          {expandSkills && (
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="text-blue-600 bg-blue-100 px-3 py-1 rounded-lg text-sm"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          )}
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <Label className="text-md font-medium text-gray-700">Resume</Label>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              className="text-blue-500 hover:underline text-sm"
              rel="noreferrer"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>

        {/* Experience Section */}
        {user?.profile?.experience?.length > 0 && (
          <div className="mt-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandExperience(!expandExperience)}
            >
              <h2 className="text-lg font-medium text-gray-800">Experience</h2>
              {expandExperience ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandExperience && (
              <ul className="space-y-4 mt-2">
                {user.profile.experience.map((exp, index) => (
                  <li key={index} className="text-gray-700">
                    <strong>{exp.title}</strong> at {exp.company} -{" "}
                    <span className="text-gray-500">
                      {exp.startDate} to {exp.endDate || "Present"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Education Section */}
        {user?.profile?.education?.length > 0 && (
          <div className="mt-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandEducation(!expandEducation)}
            >
              <h2 className="text-lg font-medium text-gray-800">Education</h2>
              {expandEducation ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandEducation && (
              <ul className="space-y-4 mt-2">
                {user.profile.education.map((edu, index) => (
                  <li key={index} className="text-gray-700">
                    <strong>{edu.degree}</strong> from {edu.institution} -{" "}
                    <span className="text-gray-500">
                      {edu.startYear} to {edu.endYear || "Present"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8 mt-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Applied Jobs
        </h2>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
