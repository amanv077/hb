import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FilterCard = () => {
  const [filters, setFilters] = useState({
    jobRole: "",
    company: "",
    workType: "",
    postedOn: "",
    minSalary: "",
    maxSalary: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    dispatch(setSearchedQuery(filters)); // Send all filters to Redux
  };

  const resetFilters = () => {
    setFilters({
      jobRole: "",
      company: "",
      workType: "",
      postedOn: "",
      minSalary: "",
      maxSalary: "",
    });
    dispatch(setSearchedQuery({})); // Reset Redux query
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full">
      <h2 className="font-semibold text-xl mb-4">Filter Jobs</h2>
      <div className="space-y-4">
        {/* Job Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Role
          </label>
          <Input
            name="jobRole"
            value={filters.jobRole}
            onChange={handleChange}
            placeholder="Enter job role (e.g., Developer)"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <Input
            name="company"
            value={filters.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        {/* Work Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Type
          </label>
          <select
            name="workType"
            value={filters.workType}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>

        {/* Posted On */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Posted On
          </label>
          <Input
            name="postedOn"
            type="date"
            value={filters.postedOn}
            onChange={handleChange}
          />
        </div>

        {/* Salary Range */}
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Salary
            </label>
            <Input
              name="minSalary"
              type="number"
              value={filters.minSalary}
              onChange={handleChange}
              placeholder="e.g., 50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Salary
            </label>
            <Input
              name="maxSalary"
              type="number"
              value={filters.maxSalary}
              onChange={handleChange}
              placeholder="e.g., 150000"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
        <Button variant="solid" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterCard;
