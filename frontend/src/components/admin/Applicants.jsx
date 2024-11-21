import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Heading Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Applicants{" "}
            <span className="text-sm bg-blue-100 text-blue-700 py-1 px-3 rounded-lg">
              {applicants?.applications?.length || 0}
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage the list of applicants for this job posting.
          </p>
        </div>

        {/* Applicants Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
