import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <Input
              className="w-full border border-gray-300 rounded-md p-3 shadow-sm"
              placeholder="Search jobs by title, role, or keywords..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            className="bg-blue-600 text-white px-5 py-3 rounded-md shadow hover:bg-blue-700"
            onClick={() => navigate("/admin/jobs/create")}
          >
            + Create New Job
          </Button>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
