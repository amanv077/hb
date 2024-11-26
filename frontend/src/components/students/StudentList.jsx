import { useState, useEffect } from "react";
import axios from "axios";
import StudentDetails from "./StudentDetails";
import StudentCard from "./StudentCard";
import { STUDENT_API_END_POINT } from "@/utils/constant";
import Filter from "./Filter";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);

  const STUDENTS_PER_PAGE = 12;

  const fetchStudents = async (page = 1, filters = {}) => {
    try {
      setLoading(true);

      // Format filters before sending to the API
      const formattedFilters = {
        ...filters,
        skills: filters.skills
          ? filters.skills.split(",").map((s) => s.trim())
          : undefined, // Split and trim skills
        experience: filters.experience || undefined,
        city: filters.city || undefined,
        state: filters.state || undefined,
      };

      const res = await axios.get(STUDENT_API_END_POINT, {
        withCredentials: true,
        params: {
          limit: STUDENTS_PER_PAGE,
          page,
          ...formattedFilters,
        },
      });

      if (res.data.success) {
        setStudents(res.data.students);
        setTotalPages(Math.ceil(res.data.total / STUDENTS_PER_PAGE));
      } else {
        setStudents([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage, filters);
  }, [currentPage, filters]);

  const handleSearch = (filterData) => {
    setFilters(filterData);
    setCurrentPage(1); // Reset to the first page when filters are applied
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 ">
      <div
        className={`max-w-7xl mx-auto px-4 py-8 flex flex-col ${
          selectedStudent ? "" : "lg:flex-row"
        }`}
      >
        {/* Filter Section */}
        {!selectedStudent && (
          <div className="lg:w-1/5 w-full mr-10 mb-6 lg:mb-0">
            <Filter onSearch={handleSearch} />
          </div>
        )}

        {/* Content Section */}
        <div className={`${selectedStudent ? "w-full" : "lg:w-2/3 w-full"}`}>
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin text-blue-600" role="status">
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
                    {students.length > 0 ? (
                      students.map((student) => (
                        <StudentCard
                          key={student._id}
                          student={student}
                          onClick={setSelectedStudent}
                        />
                      ))
                    ) : (
                      <p className="text-center text-gray-600 col-span-full">
                        No students found matching the search criteria.
                      </p>
                    )}
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
    </div>
  );
};

export default StudentList;
