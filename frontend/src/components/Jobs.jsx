import { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

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
    <div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* Filters */}
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {/* Job Listings */}
          {filteredJobs.length <= 0 ? (
            <div className="text-center flex-1">
              <p className="text-gray-500 mt-10">No jobs found.</p>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
