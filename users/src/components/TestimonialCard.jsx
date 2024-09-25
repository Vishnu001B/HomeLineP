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
    <div className="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl mx-4 mb-12 hover:bg-gradient-to-r from-blue-50 to-blue-200 w-80 h-96 overflow-hidden">
  {/* User Photo */}
  <div className="flex flex-col items-center mb-4">
    <img
      className="w-20 h-20 rounded-full border-4 border-blue-400 shadow-lg transform transition-transform duration-300 hover:scale-110"
      src={photo}
      alt={`${name}'s photo`}
    />
    {/* User Name */}
    <h5 className="text-lg font-bold text-gray-800 mt-4">{name}</h5>
    {/* User Date / Role */}
    <p className="text-gray-500 text-sm mt-1">{date}</p>
  </div>
  
  {/* Star Ratings */}
  <div className="flex space-x-1 mb-2">
    {renderStars(rating)}
  </div>
  
  {/* User Description */}
  <p className="text-gray-600 text-center text-sm italic leading-relaxed line-clamp-4">
    {description}
  </p>
</div>

  
  );
};

export default TestimonialCard;
