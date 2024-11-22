import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Initialize the input state with the user data
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null, // Resume file, initially null
    dob: user?.additionalInfo?.dob || "",
    gender: user?.additionalInfo?.gender || "",
    fatherName: user?.additionalInfo?.fatherName || "",
    address: user?.additionalInfo?.address || "",
    city: user?.additionalInfo?.city || "",
    state: user?.additionalInfo?.state || "",
    highestQualification: user?.additionalInfo?.highestQualification || "",
    experience: user?.additionalInfo?.experience || [],
    education: user?.additionalInfo?.education || [],
    profilePhoto: user?.profile?.profilePhoto || "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when value changes
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    setErrors({ ...errors, file: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!input.fullname) newErrors.fullname = "Full Name is required.";
    if (!input.email) newErrors.email = "Email is required.";
    if (!input.phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!input.bio) newErrors.bio = "Bio is required.";
    if (!input.skills) newErrors.skills = "Skills are required.";
    if (!input.dob) newErrors.dob = "Date of Birth is required.";
    if (input.file && input.file.type !== "application/pdf") {
      newErrors.file = "Only PDF files are allowed.";
    }
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("dob", input.dob);
    formData.append("gender", input.gender);
    formData.append("fatherName", input.fatherName);
    formData.append("address", input.address);
    formData.append("city", input.city);
    formData.append("state", input.state);
    formData.append("highestQualification", input.highestQualification);

    // Append file if new file selected
    if (input.file) {
      formData.append("file", input.file);
    }

    // Add experience and education if available
    if (input.experience.length > 0) {
      formData.append("experience", JSON.stringify(input.experience));
    }
    if (input.education.length > 0) {
      formData.append("education", JSON.stringify(input.education));
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false); // Close dialog on success
      }
    } catch (error) {
      let errorMessage = "Something went wrong.";
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.response?.statusText || "An error occurred.";
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent
        className="sm:max-w-[500px] p-6 bg-white rounded-md shadow-lg"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Enter your full name"
              />
              {errors.fullname && (
                <span className="text-red-500">{errors.fullname}</span>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <span className="text-red-500">{errors.phoneNumber}</span>
              )}
            </div>

            {/* Bio Input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                placeholder="Short bio"
              />
              {errors.bio && <span className="text-red-500">{errors.bio}</span>}
            </div>

            {/* Skills Input */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="Skills (comma-separated)"
              />
              {errors.skills && (
                <span className="text-red-500">{errors.skills}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={input.dob}
                onChange={changeEventHandler}
              />
              {errors.dob && <span className="text-red-500">{errors.dob}</span>}
            </div>

            {/* Resume Upload */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="file">Resume (PDF)</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
              />
              {errors.file && (
                <span className="text-red-500">{errors.file}</span>
              )}
            </div>

            {/* Submit Button */}
            <DialogFooter>
              {loading ? (
                <Button className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Update Profile
                </Button>
              )}
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
