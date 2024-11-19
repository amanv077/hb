import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Product Manager",
  "Marketing",
  "UX/UI Designer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Explore Job Categories
      </h2>

      <Carousel className="w-full">
        {/* Carousel Content */}
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center mb-6 md:basis-1/2 lg:basis-1/3 px-4"
            >
              <Button
                onClick={() => searchJobHandler(category)}
                variant="outline"
                className="bg-white hover:bg-[#004aad] text-[#004aad] hover:text-white border-2 border-[#004aad] rounded-full text-lg font-semibold py-3 px-6 transition-all duration-300"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 bg-white border border-gray-200 rounded-full text-[#004aad] hover:bg-[#004aad] hover:text-white transition-all duration-300">
          &lt;
        </CarouselPrevious>
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 bg-white border border-gray-200 rounded-full text-[#004aad] hover:bg-[#004aad] hover:text-white transition-all duration-300">
          &gt;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
