import React from "react";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className="p-5 rounded-md shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer"
      onClick={() => navigate(`/description/${job?._id}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") navigate(`/description/${job?._id}`);
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Posted Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <button
          className="rounded-full p-2 hover:bg-gray-100"
          title="Bookmark Job"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking the bookmark
          }}
        >
          <Bookmark className="h-4 w-4 text-gray-700" />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">
            {job?.company?.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {job?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg sm:text-xl text-gray-800 my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className="text-blue-600 bg-blue-100 font-medium px-2 py-1 rounded">
          {job?.position || "N/A"} Positions
        </Badge>
        <Badge className="text-red-600 bg-red-100 font-medium px-2 py-1 rounded">
          {job?.jobType || "Full-Time"}
        </Badge>
        <Badge className="text-[#004aad] bg-[#e5f0fa] font-medium px-2 py-1 rounded">
          {job?.salary || "N/A"} LPA
        </Badge>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
        <button
          className="w-full sm:w-auto px-4 py-2 text-blue-700 border border-blue-700 rounded hover:bg-blue-50"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking this button
            navigate(`/description/${job?._id}`);
          }}
        >
          Details
        </button>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-[#004aad] text-white rounded hover:bg-[#003680]"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking this button
            alert("Saved for later!");
          }}
        >
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Job;
