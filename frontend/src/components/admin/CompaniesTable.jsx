/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Table className="w-full">
        <TableCaption className="text-gray-600">
          A list of recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-gray-800">Logo</TableHead>
            <TableHead className="font-semibold text-gray-800">Name</TableHead>
            <TableHead className="font-semibold text-gray-800">Date</TableHead>
            <div className="flex justify-end mr-4">
              <TableHead className="font-semibold text-gray-800">
                Action
              </TableHead>
            </div>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              {/* Logo */}
              <TableCell className="py-4">
                <Avatar>
                  {company.logo ? (
                    <AvatarImage
                      src={company.logo}
                      alt={company.name || "Company Logo"}
                    />
                  ) : (
                    <span className="bg-gray-200 text-gray-500 w-8 h-8 flex items-center justify-center rounded-full">
                      {company.name?.[0]?.toUpperCase() || "C"}
                    </span>
                  )}
                </Avatar>
              </TableCell>

              {/* Name */}
              <TableCell className="py-4 text-gray-700 font-medium">
                {company.name}
              </TableCell>

              {/* Date */}
              <TableCell className="py-4 text-gray-600">
                {new Date(company.createdAt).toLocaleDateString()}
              </TableCell>

              {/* Actions */}
              <TableCell className="py-4">
                {/* Align button to the left with some margin */}
                <div className="flex justify-end ml-4">
                  <button
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filterCompany?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No companies found matching your search.
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;
