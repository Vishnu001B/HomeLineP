import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetailsModal = ({ product, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState(""); // Updated variable name
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();


  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async () => {
    if (name && phoneNumber) {
      try {
        // Log the data being sent
        console.log("Submitting data:", { name, phoneNumber });

        // Prepare the data
        const payload = {
          useName: name, // Directly matching what your backend expects
          phoneNumber: phoneNumber,
          productId:product._id ,
          productName:product.title,
          productImage:product.images[0]
          // Directly matching what your backend expects
        };

        // Send POST request to API
        const response = await axios.post(`${URI}api/user/book-now`, payload);

        // Check response and navigate or show success message
        if (response.status === 201) {
          Swal.fire({
            title: "Success",
            text: "your product is Booked successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });

          // Navigate to the product details page
          navigate("/productDetails/shop-in-bangalore", { state: { product } });
          onClose();
        }
      } catch (error) {
        // Log the error
        console.error(
          "Error submitting data:",
          error.response?.data || error.message
        );

        // Handle error
        Swal.fire({
          title: "Submission Failed",
          text:
            error.response?.data?.message ||
            "There was an error submitting the data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        title: "Submission Failed",
        text: "Please fill in both name and phone number.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  // Split the description into words
  const words = product.descriptions?.split(" ") || [];

  // Check if the description exceeds 60 words
  const isLongDescription = words.length > 60;

  // Toggle description between truncated and full
  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4 transition-opacity duration-300  ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-75"
        }`}
      >
        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-50 flex justify-center items-center p-4 sm:p-6">
            <img
              src={`${URI}uploads/${product?.images[0]}`}
              alt={product.title}
              className="w-full h-96 mb-2 rounded-t-md"
            />
          </div>

          {/* Product Details Section */}
          <div
            className="w-full md:w-1/2 p-4 sm:p-6 overflow-auto"
            style={{ backgroundColor: "" }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">
              {product.title}
            </h3>
            {/* <p className="text-gray-500 mb-4">{product.descriptions}</p> */}
            <div className="flex flex-col sm:flex-row  items-center mb-4 gap-4">
              <p className="text-gray-800 line-through sm:ml-2 ">
                ₹ {product.price}
              </p>
              <p className="text-red-600 text-xl font-bold">
                ₹ {product.discountedPrice}
              </p>
              <p className="text-green-600 sm:ml-2">
                ({product.discount}%) OFF
              </p>
            </div>
            <div className="">
              <div>
                <p className="  leading-relaxed">
                  {isExpanded
                    ? product.descriptions
                    : words.slice(0, 30).join(" ") +
                      (isLongDescription ? "..." : "")}
                </p>

                {isLongDescription && (
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500 hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>

            {/* Name and Phone Number Form */}
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 bg-blue-50 border-black p-3 rounded-full  w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-2 bg-blue-50 border-black p-3 rounded-full  w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                className="bg-[#4361ee] hover:bg-[#02c39a]  text-white px-4 py-3 rounded-md w-full shadow shadow-xl  transition duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="text-gray-500 text-5xl absolute top-0 right-5 hover:text-gray-700 transition duration-300  "
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
