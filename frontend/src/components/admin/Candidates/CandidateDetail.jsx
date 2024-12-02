import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CANDIDATE_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const CandidateDetail = () => {
  const { id } = useParams(); // Retrieve candidate ID from URL params
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const res = await axios.get(`${CANDIDATE_API_END_POINT}/${id}`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          setCandidate(res.data.candidate);
        } else {
          setError("Failed to fetch candidate details.");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching candidate details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateDetails();
  }, [id]);

  if (loading) {
    return <p>Loading candidate details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Candidate Details
        </h1>
        {candidate ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-600">Email: {candidate.email}</p>
            <p className="text-gray-600">Phone: {candidate.number}</p>
            <p className="text-gray-600">
              Current Location: {candidate.current_location}
            </p>
            <p className="text-gray-600">
              Current Company: {candidate.currentCompany}
            </p>
            <p className="text-gray-600">
              Total Experience: {candidate.totalExperience}
            </p>
            <p className="text-gray-600">
              Notice Period: {candidate.notice_period}
            </p>

            <h3 className="text-xl font-semibold mt-4">Education</h3>
            <ul className="list-disc pl-6">
              {candidate.education.map((edu, index) => (
                <li key={index}>
                  {edu.college} - {edu.course} ({edu.year}): {edu.marks}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-4">Experience</h3>
            <ul className="list-disc pl-6">
              {candidate.experience.map((exp, index) => (
                <li key={index}>
                  {exp.company} - {exp.designation} ({exp.from} to {exp.to}):{" "}
                  {exp.ctc} CTC
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No candidate details available.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateDetail;
