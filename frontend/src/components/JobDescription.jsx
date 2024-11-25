import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply for the job."
      );
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        toast.error("Failed to fetch job details.");
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Back Button */}
        <Button
          variant="outline"
          className="mt-4 ml-4 text-gray-600 border-gray-300 hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {/* Job Header */}
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center gap-6">
          {singleJob?.company?.logo && (
            <img
              src={singleJob.company.logo}
              alt={`${singleJob.company.name} Logo`}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {singleJob?.title}
            </h1>
            <p className="text-gray-600">
              {singleJob?.company?.name || "Unknown Company"}
            </p>
          </div>
        </div>

        {/* Job Details */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Job Details
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>Role:</strong> {singleJob?.title}
              </li>
              <li>
                <strong>Location:</strong>{" "}
                {singleJob?.location || "Not specified"}
              </li>
              <li>
                <strong>Experience:</strong> {singleJob?.experienceLevel || 0}{" "}
                years
              </li>
              <li>
                <strong>Salary:</strong> ₹{singleJob?.salary || "N/A"} LPA
              </li>
              <li>
                <strong>Job Type:</strong> {singleJob?.jobType || "N/A"}
              </li>
              <li>
                <strong>Positions:</strong> {singleJob?.position || "N/A"}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              About the Job
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {singleJob?.description || "Description not available."}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Additional Information
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-blue-100 text-blue-800">
              Total Applicants: {singleJob?.applications?.length || 0}
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              Experience Required: {singleJob?.experienceLevel || 0} years
            </Badge>
            <Badge className="bg-orange-100 text-orange-800">
              {singleJob?.jobType}
            </Badge>
          </div>
        </div>

        {/* Footer with Apply Button */}
        <div className="p-6 border-t border-gray-200">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`w-full py-3 ${
              isApplied
                ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } rounded-lg`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
