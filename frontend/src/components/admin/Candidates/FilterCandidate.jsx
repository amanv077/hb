import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import CandidateCard from "./CandidateCard"; // Assuming this is your CandidateCard component
import { CANDIDATE_API_END_POINT } from "@/utils/constant"; // Replace with your API endpoint

const FilterCandidate = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const normalizeString = (str) => {
    return str
      .toLowerCase() // Convert to lowercase
      .replace(/[\s,]+/g, ""); // Remove spaces and commas
  };

  const searchCandidates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${CANDIDATE_API_END_POINT}`);
      if (res?.data?.success) {
        const allCandidates = res.data.candidates;
        setCandidates(allCandidates);

        // Filter candidates based on search query
        const filtered = allCandidates.filter((candidate) => {
          const normalizedQuery = normalizeString(searchQuery);
          return Object.keys(candidate).some((key) =>
            normalizeString(String(candidate[key])).includes(normalizedQuery)
          );
        });

        setFilteredCandidates(filtered);
      } else {
        toast.error("Failed to fetch candidates.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching candidates.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Search Candidates
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Search by name, number, or any field..."
          />
          <button
            onClick={searchCandidates}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <p className="text-gray-500">Loading candidates...</p>}

        {/* Filtered Candidates */}
        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <CandidateCard key={candidate._id} candidate={candidate} />
            ))}
          </div>
        ) : (
          !loading && <p className="text-gray-500">No candidates found.</p>
        )}
      </div>
    </div>
  );
};

export default FilterCandidate;
