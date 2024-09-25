import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewComponent = ({ productId }) => {
  const [review, setReview] = useState({
    username: "",
    description: "",
    rating: 0,
  });
  const [reviews, setReviews] = useState([]);
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email"); // Assuming email is stored in localStorage
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
   

    fetchProductReview();
  }, [productId, URI]);
   // Fetch reviews when component mounts
   const fetchProductReview = async () => {
    try {
      const response = await axios.get(`${URI}api/admin/getProductReview/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching product reviews", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleRatingChange = (e) => {
    setReview({
      ...review,
      rating: parseInt(e.target.value, 10),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!review.username || !review.description || review.rating === 0) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill out all fields and select a rating.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Prepare review data
    const reviewData = {
      ...review,
      productId,
      userId,
      email,
    };

    try {
      const response = await axios.patch(`${URI}api/admin/postReview`, reviewData);
      
      
        Swal.fire({
          title: 'Success',
          text: 'Your review has been submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setReview({ username: "", description: "", rating: 0 }); // Clear the form
        fetchProductReview();
       
    } catch (error) {
      console.error("Error submitting review", error);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem submitting your review. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className=" hidden flex flex-col-reverse gap-5 lg:flex-row-reverse items-center lg:items-start justify-between p-6 space-y-6 lg:space-y-0 lg:space-x-8">
      {/* Left Section - User Review Form */}
      <div className="w-full lg:w-1/2 p-6 rounded-lg border-2 border-gray-200 bg-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={review.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Review</label>
            <textarea
              name="description"
              value={review.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Write your review"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
            <select
              name="rating"
              value={review.rating}
              onChange={handleRatingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Right Section - Display Reviews */}
      <div className="w-full lg:w-1/2 border-2 border-gray-200 p-6 rounded-lg bg-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r, index) => (
              <div key={index} className="border-b pb-2 mb-2">
                <div className="text-sm font-medium text-gray-800">Username: {r.username}</div>
                <div className="text-sm text-gray-600">Review: {r.description}</div>
                <div className="text-sm text-gray-800">
                  Rating: {"★".repeat(r.rating).split("").map((star, i) => (
                    <span key={i} className="text-yellow-500">{star}</span>
                  ))}
                  {"☆".repeat(5 - r.rating).split("").map((star, i) => (
                    <span key={i} className="text-gray-300">{star}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews available for this product.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
