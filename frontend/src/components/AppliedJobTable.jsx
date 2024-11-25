import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <Table className="w-full text-left">
        <TableCaption className="text-lg font-semibold text-gray-800 mb-4">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="hidden sm:table-header-group">
          <TableRow className="text-sm font-semibold text-gray-600 border-b border-gray-300">
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500 py-6">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-100 cursor-pointer transition-all border-b border-gray-200 last:border-none"
              >
                <TableCell className="text-sm text-gray-700 sm:hidden">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">
                      {appliedJob.job?.title}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {appliedJob.job?.company?.name}
                    </span>
                    <Badge
                      className={`text-white font-semibold py-1 px-3 rounded-full w-max ${
                        appliedJob?.status === "rejected"
                          ? "bg-red-500"
                          : appliedJob.status === "pending"
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                    <span className="text-gray-500 text-sm">
                      {appliedJob?.createdAt?.split("T")[0]}
                    </span>
                  </div>
                </TableCell>

                {/* Visible on larger screens */}
                <TableCell className="text-sm text-gray-700 hidden sm:table-cell">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-sm font-semibold text-gray-800 hidden sm:table-cell">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="text-sm text-gray-600 hidden sm:table-cell">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-sm text-right hidden sm:table-cell">
                  <Badge
                    className={`text-white font-semibold py-1 px-3 rounded-full ${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob.status === "pending"
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
