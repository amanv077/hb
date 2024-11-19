import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() === "") {
      return; // Prevent empty queries
    }
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative bg-white py-4">
      <div className="container mx-auto text-center px-6 sm:px-8">
        <div className="mb-6">
          <span className="text-xl font-medium uppercase tracking-widest text-orange-600 bg-clip-text text-transparent select-none">
            Your Dream Job Starts Here
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6 select-none">
          Find Your Perfect Career Path <br />
          With <span className="text-[#004aad]">Ease & Confidence</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto text-gray-600 select-none">
          Explore thousands of opportunities in your field. Whether you’re a
          seasoned professional or just starting your career, we connect you
          with the best companies and roles that fit your aspirations.
        </p>

        <div className="flex w-full sm:w-2/3 mx-auto rounded-full shadow-xl bg-white p-3 items-center border border-gray-300">
          <input
            type="text"
            placeholder="Search for jobs, roles, or companies"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-l-full p-3 outline-none border-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#004aad]"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#004aad] text-white hover:bg-[#5f32ad] p-3 transition-all"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-700 select-none">
            Popular Categories
          </h2>
          <div className="flex justify-center mt-6 space-x-6">
            <Button className="bg-[#004aad] text-white hover:bg-[#5f32ad] py-2 px-4 rounded-full text-sm font-semibold transition-all">
              Software Engineering
            </Button>
            <Button className="bg-[#004aad] text-white hover:bg-[#5f32ad] py-2 px-4 rounded-full text-sm font-semibold transition-all">
              Data Science
            </Button>
            <Button className="bg-[#004aad] text-white hover:bg-[#5f32ad] py-2 px-4 rounded-full text-sm font-semibold transition-all">
              Product Management
            </Button>
            <Button className="bg-[#004aad] text-white hover:bg-[#5f32ad] py-2 px-4 rounded-full text-sm font-semibold transition-all">
              Marketing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
