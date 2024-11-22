import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const profileImage =
    user?.profile?.profilePhoto ||
    "https://via.placeholder.com/150?text=Avatar"; // Fallback image

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage} alt="Profile Picture" />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.fullname || "No Name"}
              </h1>
              <p className="text-sm text-gray-600">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
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
        <div className="my-6">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Resume Section */}
        <div className="mb-6">
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
          <div className="my-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Experience
            </h2>
            <ul className="space-y-4">
              {user.profile.experience.map((exp, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{exp.title}</strong> at {exp.company} -{" "}
                  <span className="text-gray-500">
                    {exp.startDate} to {exp.endDate || "Present"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education Section */}
        {user?.profile?.education?.length > 0 && (
          <div className="my-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Education
            </h2>
            <ul className="space-y-4">
              {user.profile.education.map((edu, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{edu.degree}</strong> from {edu.institution} -{" "}
                  <span className="text-gray-500">
                    {edu.startYear} to {edu.endYear || "Present"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
