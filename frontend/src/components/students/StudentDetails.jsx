import React from "react";

const StudentDetails = ({ student, onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="bg-white shadow-xl rounded-lg max-w-5xl mx-auto p-8">
        {/* Back Button */}
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg mb-6 hover:bg-blue-700 transition"
          onClick={onBack}
        >
          &larr; Back
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-lg text-gray-500">{`${student.city}, ${student.state}`}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <p className="text-gray-600">
              <strong>Mobile:</strong> {student.mobile}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {student.email}
            </p>
            <p className="text-gray-600">
              <strong>Date of Birth:</strong> {student.dob || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Gender:</strong> {student.gender || "N/A"}
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <p className="text-gray-600">
              <strong>Address:</strong> {student.address || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Qualification:</strong> {student.highestQualification} (
              {student.highestQualificationCategory || "N/A"})
            </p>
            <p className="text-gray-600">
              <strong>Work Experience:</strong> {student.totWorkExp || 0} years
            </p>
            <p className="text-gray-600">
              <strong>Resume:</strong>{" "}
              <a
                href={student.resume_path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-700"
              >
                Download
              </a>
            </p>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Education
          </h3>
          {student.education.length > 0 ? (
            <div className="grid gap-4">
              {student.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-sm"
                >
                  <p className="text-gray-600">
                    <strong>Qualification:</strong> {edu.qualification}
                  </p>
                  <p className="text-gray-600">
                    <strong>Institute:</strong> {edu.institute || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Year Passed:</strong> {edu.passedOn || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Percentage:</strong> {edu.percentage || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No education details available.</p>
          )}
        </div>

        {/* Work Experience Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Work Experience
          </h3>
          {student.experience.length > 0 ? (
            <div className="grid gap-4">
              {student.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-sm"
                >
                  <p className="text-gray-600">
                    <strong>Company Name:</strong> {exp.compName || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Industry:</strong> {exp.industry || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Designation:</strong> {exp.designation || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Duration:</strong> {exp.startDate || "N/A"} -{" "}
                    {exp.endDate || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No work experience details available.
            </p>
          )}
        </div>

        {/* Additional Skills Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Additional Skills
          </h3>
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            {student.skills && student.skills.length > 0 ? (
              <div className="flex flex-wrap space-x-4 space-y-2">
                {student.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No additional skills available.</p>
            )}
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Additional Information
          </h3>
          <p className="text-gray-600">
            <strong>Candidate Summary:</strong>{" "}
            {student.candidate_summary || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Uploaded Location:</strong>{" "}
            {student.uploadLocation || "N/A"}
          </p>
          {student.answers && student.answers.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Answers:</h4>
              {student.answers.map((ans, index) => (
                <p key={index} className="text-gray-600 mt-2">
                  <strong>{ans.question}:</strong> {ans.answer}
                </p>
              ))}
            </div>
          )}
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg mb-6 hover:bg-blue-700 transition"
          onClick={onBack}
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
