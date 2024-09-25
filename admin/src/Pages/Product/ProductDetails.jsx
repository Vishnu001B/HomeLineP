import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = ({ product, fetchProduct }) => {
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Handle Delete Function
  const handleDelete = async () => {
    try {
      await axios.delete(`${URI}api/admin/product/${product._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProduct(); // Re-fetch products to update the list after deletion
    } catch (error) {
      console.error("Error deleting product", error.message);
    }
  };

  return (
    <>
      <Card
        className="relative group" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          <div className="flex justify-center h-32 w-full p-4">
            <img
              src={`${URI}uploads/${product?.images[0]}`}
              alt={`Product image`}
              className="object-fill"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-500">Price: ₹{product.price}</p>
            <p className="text-gray-500">Category: {product.categories}</p>
          </div>
        </CardContent>

        {/* Buttons that appear on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center space-y-2">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                navigate("/UpdateProduct", { state: { product } });
              }}
            >
              Update
            </Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => {
                navigate("/Product-Details", { state: { product } });
              }}
            >
              View Details
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default ProductDetails;
