import { useState, useEffect } from "react";
import axios from "axios";
import StudentDetails from "./StudentDetails";
import StudentCard from "./StudentCard";
import { STUDENT_API_END_POINT } from "@/utils/constant";
import Filter from "./Filter";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const STUDENTS_PER_PAGE = 12;

  const fetchStudents = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(STUDENT_API_END_POINT, {
        withCredentials: true,
        params: {
          limit: STUDENTS_PER_PAGE,
          page,
        },
      });
      if (res.data.success) {
        setStudents(res.data.students);
        setTotalPages(Math.ceil(res.data.total / STUDENTS_PER_PAGE));
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Filter />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Directory
          </h1>
          <p className="text-gray-600 mt-2">
            Browse through our list of students.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div
              className="spinner-border animate-spin text-blue-600"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {selectedStudent ? (
              <StudentDetails
                student={selectedStudent}
                onBack={() => setSelectedStudent(null)}
              />
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {students.map((student) => (
                    <StudentCard
                      key={student._id}
                      student={student}
                      onClick={setSelectedStudent}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <div className="text-gray-600">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                  </div>
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
