/* eslint-disable react/prop-types */

const StudentCard = ({ student, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
      onClick={() => onClick(student)}
    >
      <h2 className="text-lg font-semibold text-blue-700">{student.name}</h2>
      <p className="text-gray-500">{`${student.city}, ${student.state}`}</p>
      <p className="text-gray-600">{student.mobile}</p>
      <p className="text-gray-600 overflow-hidden">{student.email}</p>
    </div>
  );
};

export default StudentCard;
