// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CandidateList = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Candidate List</h1>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={() => navigate("/create-candidate")}
//       >
//         Create Candidate
//       </button>
//     </div>
//   );
// };

// export default CandidateList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import CandidateCard from "./CandidateCard";
import { CANDIDATE_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${CANDIDATE_API_END_POINT}`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        setCandidates(res.data.candidates);
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

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Candidate List
        </h1>
        {loading ? (
          <p className="text-gray-500">Loading candidates...</p>
        ) : candidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
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
