import React from "react";

const StudentDetails = ({ student, onBack }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <button
        className="bg-blue-600 text-white py-2 px-6 rounded-md mb-6 hover:bg-blue-700 transition"
        onClick={onBack}
      >
        Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
      <p className="text-gray-500 mt-1">{`${student.city}, ${student.state}`}</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
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
        <div>
          <p className="text-gray-600">
            <strong>Address:</strong> {student.address || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Highest Qualification:</strong>{" "}
            {student.highestQualification} (
            {student.highestQualificationCategory || "N/A"})
          </p>
          <p className="text-gray-600">
            <strong>Total Work Experience:</strong> {student.totWorkExp || 0}{" "}
            years
          </p>
          <p className="text-gray-600">
            <strong>Resume:</strong>{" "}
            <a
              href={student.resume_path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-700"
            >
              Download Resume
            </a>
          </p>
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Education</h3>
        {student.education.length > 0 ? (
          student.education.map((edu, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-md bg-gray-50 mb-4"
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
          ))
        ) : (
          <p className="text-gray-600">No education details available.</p>
        )}
      </div>

      {/* Work Experience Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Work Experience
        </h3>
        {student.experience.length > 0 ? (
          student.experience.map((exp, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-md bg-gray-50 mb-4"
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
          ))
        ) : (
          <p className="text-gray-600">No work experience details available.</p>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Additional Information
        </h3>
        <p className="text-gray-600">
          <strong>Candidate Summary:</strong>{" "}
          {student.candidate_summary || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Skills:</strong>{" "}
          {student.skills && student.skills.length > 0
            ? student.skills.join(", ")
            : "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Uploaded Location:</strong> {student.uploadLocation || "N/A"}
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
    </div>
  );
};

export default StudentDetails;
