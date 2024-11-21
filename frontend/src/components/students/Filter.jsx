import React, { useState } from "react";

const Filter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    state: "",
    email: "",
    mobile: "",
    skills: "",
    experience: "",
  });

  // Normalize filters to lowercase and remove unwanted spaces
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue = value.trim().replace(/\s+/g, " ").toLowerCase(); // Normalize spaces and case
    setFilters((prev) => ({ ...prev, [name]: normalizedValue }));
  };

  const handleSearch = () => {
    onSearch(filters); // Pass updated filters to the parent
  };

  const handleReset = () => {
    const resetFilters = {
      name: "",
      city: "",
      state: "",
      email: "",
      mobile: "",
      skills: "",
      experience: "",
    };
    setFilters(resetFilters);
    onSearch(resetFilters); // Reset the parent search as well
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Search Filters</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleInputChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleInputChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={filters.state}
          onChange={handleInputChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleInputChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Phone Number"
          value={filters.mobile}
          onChange={handleInputChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={filters.skills}
          onChange={handleInputChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          name="experience"
          placeholder="Minimum Experience (years)"
          value={filters.experience}
          onChange={handleInputChange}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
