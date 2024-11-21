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
      toast.error(error.response.data.message);
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
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          {/* Back Button */}
          {/* <button
         
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
        >
          <span className="material-icons">arrow_back</span> Back
        </button> */}
          <Button
            variant="outline"
            className="text-gray-600 border-gray-300 hover:bg-gray-100 "
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          {/* Header Section */}
          <div className="flex items-center mb-6">
            {singleJob?.companyLogo && (
              <img
                src={singleJob?.companyLogo}
                alt={`${singleJob?.companyName} Logo`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {singleJob?.title}
              </h1>
              <p className="text-gray-600 text-sm">
                {singleJob?.companyName || "Unknown Company"}
              </p>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Job Details
              </h2>
              <div className="space-y-4">
                <p>
                  <span className="font-medium text-gray-600">Role: </span>
                  {singleJob?.title}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Location: </span>
                  {singleJob?.location || "Not specified"}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Experience:{" "}
                  </span>
                  {singleJob?.experience || "0"} years
                </p>
                <p>
                  <span className="font-medium text-gray-600">Salary: </span>₹
                  {singleJob?.salary || "N/A"} LPA
                </p>
                <p>
                  <span className="font-medium text-gray-600">Job Type: </span>
                  {singleJob?.jobType}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Number of Positions:{" "}
                  </span>
                  {singleJob?.position}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                About the Job
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {singleJob?.description || "Description not available."}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Additional Information
            </h2>
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-blue-100 text-blue-800 font-medium">
                Total Applicants: {singleJob?.applications?.length || 0}
              </Badge>
              <Badge className="bg-green-100 text-green-800 font-medium">
                Experience Required: {singleJob?.experience || 0} years
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 font-medium">
                {singleJob?.jobType}
              </Badge>
            </div>
          </div>

          {/* Footer with Apply Button */}
          <div className="mt-10">
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
    </div>
  );
};

export default JobDescription;
