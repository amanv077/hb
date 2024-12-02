import React, { useEffect, useState } from "react";
import axios from "axios";
import CandidateCard from "./CandidateCard";
import { CANDIDATE_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${CANDIDATE_API_END_POINT}`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        setCandidates(res.data.candidates);
        setFilteredCandidates(res.data.candidates); // Set initial filtered candidates
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

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[\s,]+/g, ""); // Normalize: lowercase, remove spaces and commas
  };

  const filterCandidates = () => {
    const normalizedQuery = normalizeString(searchQuery);
    const filtered = candidates.filter((candidate) => {
      return Object.keys(candidate).some((key) =>
        normalizeString(String(candidate[key])).includes(normalizedQuery)
      );
    });
    setFilteredCandidates(filtered);
  };

  useEffect(() => {
    if (searchQuery) {
      filterCandidates();
    } else {
      setFilteredCandidates(candidates); // Reset when searchQuery is cleared
    }
  }, [searchQuery, candidates]);

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar Filter */}
      <div className="w-64 bg-white  top-20left-0 h-full shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Filter Candidates</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Search by name, number, or any field..."
          />
        </div>
      </div>

      <div className="ml-20 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Candidate List
        </h1>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
          onClick={() => navigate("/admin/create-candidate")}
        >
          Create Candidate
        </button>

        {loading ? (
          <p className="text-gray-500">Loading candidates...</p>
        ) : filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <CandidateCard key={candidate._id} candidate={candidate} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No candidates found.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
