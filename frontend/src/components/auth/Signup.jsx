import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student", // Default role set to "Candidate"
    file: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    let emailError = "";
    let phoneError = "";

    if (!validateEmail(input.email)) {
      emailError = "Please enter a valid email.";
      formIsValid = false;
    }

    if (!validatePhoneNumber(input.phoneNumber)) {
      phoneError = "Please enter a valid phone number (10 digits).";
      formIsValid = false;
    }

    setErrors({ email: emailError, phoneNumber: phoneError });

    if (!formIsValid) {
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center py-12">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="e.g. John Doe"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
            </div>

            {/* Email Field */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="e.g. john.doe@gmail.com"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="e.g. 8080808080"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="******"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
            </div>

            {/* Role Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Role</Label>
              <RadioGroup className="flex gap-4 my-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="candidate"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="h-5 w-5 text-blue-500"
                  />
                  <Label htmlFor="candidate" className="text-gray-700">
                    Candidate
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="h-5 w-5 text-blue-500"
                  />
                  <Label htmlFor="recruiter" className="text-gray-700">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Profile Image Upload */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Profile Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <div>
              {loading ? (
                <Button className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please
                  wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Signup
                </Button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
