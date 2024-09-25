import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const URI = import.meta.env.VITE_API_URL;

  if (!product) {
    return <p>No product data available.</p>;
  }

  const handleDelete = () => {
    // Implement delete functionality here
    console.log("Deleting product with ID:", product._id);
    // After deletion, navigate to the product list page or other desired page
    navigate("/products"); // Adjust the route as needed
  };

  const handleUpdate = async () => {
    try {
      await axios.delete(`${URI}api/admin/product/${product._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProduct(); // Re-fetch products to update the list after deletion
    } catch (error) {
      console.error("Error deleting product", error.message);
    } // Adjust the route as needed
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="p-4 ">
      <button
        onClick={handleBack}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={`${URI}uploads/${product.images[0]}`}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 md:pl-4 ">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

          <p className="mb-4">{product.descriptions}</p>
          <p className="mb-4">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="mb-4">
            <strong>Discount:</strong> {product.discount}%
          </p>
          <p className="mb-4">
            <strong>Total Price:</strong> ${product.totalPrice}
          </p>
          <p className="mb-4">
            <strong>SKU Code:</strong> {product.skuCode}
          </p>
          <p className="mb-4">
            <strong>Rating:</strong> {product.rating}
          </p>
          <p className="mb-4">
            <strong>Material:</strong> {product.material}
          </p>
          <p className="mb-4">
            <strong>Color:</strong> {product.color}
          </p>
          <p className="mb-4">
            <strong>Categories:</strong> {product.categories}
          </p>
          <p className="mb-4">
            <strong>Specials Category:</strong>{" "}
            {product.specialsCategory.join(", ")}
          </p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Additional Images</h2>
            <div className="flex flex-wrap">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={`${URI}uploads/${image}`}
                  alt={`${product.title} additional image ${index + 1}`}
                  className="w-24 h-24 object-cover p-1"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => {
                navigate("/UpdateProduct", { state: { product } });
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={handleUpdate}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
