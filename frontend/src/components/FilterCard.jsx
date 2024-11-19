import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const resetFilters = () => {
    setSelectedValue(""); // Reset selected filter
    dispatch(setSearchedQuery("")); // Reset the search query in Redux
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-xl text-gray-800">Filter Jobs</h1>
        {/* Reset Button */}
      </div>
      <button
        onClick={resetFilters}
        className="text-sm text-blue-500 hover:text-blue-700 font-medium"
      >
        Reset Filters
      </button>
      <hr className="my-3 border-gray-300" />

      {/* Location Filter */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        <div className="mb-6">
          <h2 className="font-semibold text-lg text-gray-700 mb-2">Location</h2>
          {["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"].map(
            (item, idx) => {
              const itemId = `location-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-gray-600">
                    {item}
                  </Label>
                </div>
              );
            }
          )}
        </div>

        {/* Industry Filter */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg text-gray-700 mb-2">Industry</h2>
          {[
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
          ].map((item, idx) => {
            const itemId = `industry-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} id={itemId} />
                <Label htmlFor={itemId} className="text-gray-600">
                  {item}
                </Label>
              </div>
            );
          })}
        </div>

        {/* Salary Filter */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg text-gray-700 mb-2">Salary</h2>
          {["0-40k", "42-1lakh", "1lakh to 5lakh"].map((item, idx) => {
            const itemId = `salary-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} id={itemId} />
                <Label htmlFor={itemId} className="text-gray-600">
                  {item}
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
