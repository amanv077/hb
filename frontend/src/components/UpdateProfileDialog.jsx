import React, { useState } from "react";
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
import { Loader2, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
    dob: user?.additionalInfo?.dob || "",
    gender: user?.additionalInfo?.gender || "",
    fatherName: user?.additionalInfo?.fatherName || "",
    address: user?.additionalInfo?.address || "",
    city: user?.additionalInfo?.city || "",
    state: user?.additionalInfo?.state || "",
    highestQualification: user?.additionalInfo?.highestQualification || "",
    experience: user?.profile?.experience || [],
    education: user?.profile?.education || [],
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
    setErrors({ ...errors, file: "" });
  };

  const handleListChange = (type, index, key, value) => {
    const updatedList = [...input[type]];
    updatedList[index][key] = value;
    setInput({ ...input, [type]: updatedList });
  };

  const handleAddListItem = (type) => {
    const newItem =
      type === "education"
        ? { degree: "", institution: "" }
        : { title: "", company: "" };
    setInput({ ...input, [type]: [...input[type], newItem] });
  };

  const handleRemoveListItem = (type, index) => {
    const updatedList = [...input[type]];
    updatedList.splice(index, 1);
    setInput({ ...input, [type]: updatedList });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    for (const key in input) {
      if (key === "file" && input[key]) {
        formData.append("file", input.file);
      } else if (Array.isArray(input[key])) {
        formData.append(key, JSON.stringify(input[key]));
      } else {
        formData.append(key, input[key]);
      }
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        setOpen(false);
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Inputs */}
          {[
            "fullname",
            "email",
            "phoneNumber",
            "bio",
            "skills",
            "dob",
            "gender",
            "fatherName",
            "address",
            "city",
            "state",
            "highestQualification",
          ].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <Label htmlFor={field}>
                {field.split(/(?=[A-Z])/).join(" ")}
              </Label>
              <Input
                id={field}
                name={field}
                value={input[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
              />
              {errors[field] && (
                <span className="text-red-500">{errors[field]}</span>
              )}
            </div>
          ))}

          {/* Education Section */}
          <div>
            <Label>Education</Label>
            {input.education.map((edu, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  name="degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleListChange(
                      "education",
                      index,
                      "degree",
                      e.target.value
                    )
                  }
                  placeholder="Degree"
                />
                <Input
                  name="institution"
                  value={edu.institution}
                  onChange={(e) =>
                    handleListChange(
                      "education",
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="Institution"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveListItem("education", index)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => handleAddListItem("education")}
            >
              Add Education
            </Button>
          </div>

          {/* Experience Section */}
          <div>
            <Label>Experience</Label>
            {input.experience.map((exp, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  name="title"
                  value={exp.title}
                  onChange={(e) =>
                    handleListChange(
                      "experience",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Job Title"
                />
                <Input
                  name="company"
                  value={exp.company}
                  onChange={(e) =>
                    handleListChange(
                      "experience",
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  placeholder="Company"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveListItem("experience", index)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => handleAddListItem("experience")}
            >
              Add Experience
            </Button>
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="file">Resume (PDF)</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {errors.file && <span className="text-red-500">{errors.file}</span>}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
