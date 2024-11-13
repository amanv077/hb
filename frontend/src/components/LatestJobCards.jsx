import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="job-card p-6 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105 m-2"
    >
      <div className="mb-4">
        <h1 className="font-semibold text-xl text-[#004aad]">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-lg text-gray-800 mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <Badge
          className="text-blue-700 font-semibold bg-blue-100"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-[#F83002] font-semibold bg-red-100"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-blue-700 font-semibold bg-blue-100"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
