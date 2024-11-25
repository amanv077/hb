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
    <div className="relative bg-white py-4 sm:py-6">
      <div className="container mx-auto text-center px-4 sm:px-6">
        {/* Title and Description */}
        <div className="mb-4 sm:mb-6">
          <span className="text-sm sm:text-base font-medium uppercase tracking-wide text-orange-600 select-none">
            Your Dream Job Starts Here
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 select-none">
          Find Your Perfect Career Path <br />
          With <span className="text-[#004aad]">Ease & Confidence</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600 select-none">
          Explore thousands of opportunities. Whether you’re a seasoned
          professional or just starting, we connect you with the best companies
          and roles.
        </p>

        {/* Modern Search Bar */}
        <div className="flex flex-col items-center sm:flex-row w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto bg-gray-100 rounded-xl shadow-sm p-2 space-y-3 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Search jobs, roles, or companies"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 w-full p-3 text-gray-800 rounded-lg sm:rounded-l-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#004aad] placeholder-gray-500"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#004aad] hover:bg-[#5f32ad] text-white rounded-lg sm:rounded-r-xl px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center w-full sm:w-auto"
          >
            <Search className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        {/* Categories */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-700 select-none">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 mt-4">
            {[
              "Software Engineering",
              "Data Science",
              "Product Management",
              "Marketing",
            ].map((category, index) => (
              <Button
                key={index}
                className="bg-[#004aad] text-white hover:bg-[#5f32ad] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all w-full sm:w-auto"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
