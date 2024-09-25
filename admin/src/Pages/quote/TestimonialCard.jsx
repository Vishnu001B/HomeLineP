// TestimonialCard.js
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const TestimonialCard = ({ photo, name, date, rating, description }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <AiFillStar key={i} className="text-yellow-500" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-white to-gray-100 border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 mx-2 mb-8" // Added margin and width
    >
      <div className="lg:flex block justify-center items-center gap-10 space-x-4 mb-4">
        <div className="flex flex-col justify-center items-center my-4">
          <img
            className="w-32 h-32 rounded-full border-2 border-gray-300"
            src={photo}
            alt={`${name}'s photo`}
          />
        </div>
        <div className="flex flex-col justify-center items-center my-4">
          <h5 className="text-lg font-bold">{name}</h5>
          <p className="text-gray-500">{date}</p>

          <div className="flex space-x-1">{renderStars()}</div>

          <p className="text-gray-700 text-center my-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
