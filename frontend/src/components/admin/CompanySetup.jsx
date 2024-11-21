/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Home, MapPin, Link, Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Event handler for text inputs
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Event handler for file inputs
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!input.name) newErrors.name = "Company name is required";
    if (!input.description) newErrors.description = "Description is required";
    if (!input.website || !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(input.website))
      newErrors.website = "Valid website URL is required";
    if (!input.location) newErrors.location = "Location is required";
    if (input.file && input.file.size > 5 * 1024 * 1024)
      newErrors.file = "File size should not exceed 5MB";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-6 mb-6 bg-blue-50 rounded-lg">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-gray-800 ">Company Setup</h1>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Company Name</Label>
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className={`w-full p-3 border rounded-md focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="absolute text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Description</Label>
              <div className="relative">
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className={`w-full p-3 border rounded-md focus:outline-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <p className="absolute text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Website</Label>
              <div className="relative">
                <Input
                  type="url"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className={`w-full p-3 border rounded-md focus:outline-none ${
                    errors.website ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.website && (
                  <p className="absolute text-red-500 text-sm mt-1">
                    {errors.website}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Location</Label>
              <div className="relative">
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className={`w-full p-3 border rounded-md focus:outline-none ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && (
                  <p className="absolute text-red-500 text-sm mt-1">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Logo</Label>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className={`w-full p-3 border rounded-md focus:outline-none ${
                    errors.file ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.file && (
                  <p className="absolute text-red-500 text-sm mt-1">
                    {errors.file}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <Button className="w-full bg-blue-600 text-white py-3 rounded-md flex justify-center items-center">
                <Loader2 className="animate-spin mr-2" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md"
              >
                <Edit className="mr-2" />
                Update Company
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
