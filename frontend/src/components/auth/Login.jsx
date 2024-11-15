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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Login to Your Account
          </h1>
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="e.g. patel@gmail.com"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
              />
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
                placeholder="********"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
              />
            </div>

            {/* Role Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Role</Label>
              <RadioGroup className="flex space-x-4">
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="h-5 w-5 text-blue-500"
                  />
                  <Label htmlFor="r1" className="ml-2 text-gray-700">
                    Candidate
                  </Label>
                </div>
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="h-5 w-5 text-blue-500"
                  />
                  <Label htmlFor="r2" className="ml-2 text-gray-700">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
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
                  Login
                </Button>
              )}
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Signup
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
