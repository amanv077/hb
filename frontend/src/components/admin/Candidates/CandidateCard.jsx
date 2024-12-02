import React from "react";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">{candidate.name}</h2>
      <p className="text-sm text-gray-600">Email: {candidate.email}</p>
      <p className="text-sm text-gray-600">Phone: {candidate.number}</p>
      <p className="text-sm text-gray-600">
        Experience: {candidate.totalExperience} years
      </p>
      <p className="text-sm text-gray-600">
        Current CTC: ₹{candidate.currentCTC}
      </p>
      <p className="text-sm text-gray-600">
        Company: {candidate.currentCompany}
      </p>
    </div>
  );
};

export default CandidateCard;
