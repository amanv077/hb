/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Registered Companies
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Manage and view all companies registered on the platform.
          </p>
        </div>

        {/* Filter and Create New Company */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Input
              className="w-full sm:w-1/2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Search by company name..."
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add New Company
            </Button>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
