/* eslint-disable react/prop-types */
import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Import date formatting function

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  // Format the posted date (assuming job.postedDate is an ISO string)
  const formattedDate = job?.postedDate
    ? format(new Date(job?.postedDate), "MMM dd, yyyy")
    : "N/A";

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="job-card p-4 rounded-lg shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 m-2 max-w-sm w-full"
    >
      {/* Job Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="font-semibold text-lg text-[#004aad]">
            {job?.company?.name}
          </h1>
          <p className="text-xs text-gray-500">
            {job?.location || "India"} {/* Make location dynamic */}
          </p>
        </div>
        <p className="text-xs text-gray-400">{formattedDate}</p>
      </div>

      {/* Job Title and Description */}
      <h2 className="font-semibold text-xl text-gray-800 mb-2">{job?.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>

      {/* Job Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge
          className="text-blue-600 font-semibold bg-blue-100"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-red-600 font-semibold bg-red-100"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-green-600 font-semibold bg-green-100"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
