/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const validateCompanyName = () => {
    if (!companyName) {
      return "Company name is required.";
    }
    if (companyName.length < 3) {
      return "Company name must be at least 3 characters long.";
    }
    return "";
  };

  const registerNewCompany = async () => {
    const validationError = validateCompanyName();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Your Company Name
          </h1>
          <p className="text-gray-500 mt-2">
            What would you like to give your company name? You can change it
            later.
          </p>
        </div>

        {/* Company Name Input */}
        <div className="space-y-4">
          <Label className="text-gray-700">Company Name</Label>
          <Input
            type="text"
            value={companyName}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="JobHunt, Microsoft, etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {/* Error message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            className="text-gray-600 border-gray-300 hover:bg-gray-100"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
