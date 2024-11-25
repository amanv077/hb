import { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle filter visibility

  useEffect(() => {
    const filterJobs = () => {
      if (!searchedQuery) return allJobs;

      return allJobs.filter((job) => {
        const matchesRole = searchedQuery.jobRole
          ? job.title
              .toLowerCase()
              .includes(searchedQuery.jobRole.toLowerCase())
          : true;
        const matchesCompany = searchedQuery.company
          ? job.company
              .toLowerCase()
              .includes(searchedQuery.company.toLowerCase())
          : true;
        const matchesWorkType = searchedQuery.workType
          ? job.workType === searchedQuery.workType
          : true;
        const matchesPostedOn = searchedQuery.postedOn
          ? new Date(job.postedOn).toLocaleDateString() ===
            new Date(searchedQuery.postedOn).toLocaleDateString()
          : true;
        const matchesSalary =
          (!searchedQuery.minSalary ||
            job.salary >= parseInt(searchedQuery.minSalary)) &&
          (!searchedQuery.maxSalary ||
            job.salary <= parseInt(searchedQuery.maxSalary));

        return (
          matchesRole &&
          matchesCompany &&
          matchesWorkType &&
          matchesPostedOn &&
          matchesSalary
        );
      });
    };

    setFilteredJobs(filterJobs());
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-5 h-screen flex flex-col">
      <div className="flex flex-col md:flex-row gap-5 overflow-hidden">
        {/* Filters */}
        <div
          className={`w-full md:w-[20%] transition-all duration-300 ${
            isFilterOpen ? "block" : "hidden md:block"
          }`}
        >
          <FilterCard />
        </div>

        {/* Button to toggle filter visibility */}
        <button
          className="md:hidden text-[#004aad] font-semibold p-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Job Listings */}
        <div className="flex-1 overflow-y-auto h-[80vh]">
          {filteredJobs.length <= 0 ? (
            <div className="text-center flex-1">
              <p className="text-gray-500 mt-10">No jobs found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job._id}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
