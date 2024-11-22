import React, { useEffect } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  const { allJobs, loading } = useSelector((store) => store.job); // Assuming `loading` is part of the Redux state
  const dispatch = useDispatch();

  // Fetch jobs on mount
  useGetAllJobs();

  // Clear search query on component unmount
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="max-w-4xl my-4">
      <h1 className="font-bold text-2xl mb-6">
        {loading ? "Loading Jobs..." : `Search Results (${allJobs.length})`}
      </h1>

      {loading ? (
        // Loading state
        <div className="flex justify-center items-center h-[60vh]">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-blue-500"></div>
        </div>
      ) : allJobs.length === 0 ? (
        // No jobs found
        <div className="text-center text-gray-500 text-lg h-[60vh] flex items-center justify-center">
          No jobs found. Please try a different search query.
        </div>
      ) : (
        // Display jobs
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          role="list"
        >
          {allJobs.map((job) => (
            <Job key={job._id} job={job} role="listitem" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
