import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import StatusBar from "./StatusBar"; // Import StatusBar component

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const URI = import.meta.env.VITE_API_URL;

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${URI}api/productOrder/getorder/${id}`);
      const data = await response.json();
      setOrderDetails(data);
      console.log(data, "orderDetails");
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    } else {
      console.error("No orderId found in URL");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>No order details available.</div>;
  }

  const { products, address, status, paymentMethod, paymentStatus, createdAt } =
    orderDetails;

  const cancelOrder = async () => {
    try {
      await axios.put(`${URI}api/productOrder/cancelOrder/${id}`);
      fetchOrderDetails();
      Swal.fire({
        icon: "success",
        title: "Order cancelled successfully",
        text: "Your order is successfully cancelled.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong while cancelling the order",
        text: "Please try again.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-4 pt-40 lg:px-[6%] ">
      <div className="flex w-full justify-between items-center">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-gray-600">Order ID: {id}</p>
          <p className="text-gray-600">Payment Method: {paymentMethod}</p>
          <p className="text-gray-600">Payment Status: {paymentStatus}</p>
          <p className="text-gray-600">
            Order Date: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <button className="text-blue-500 text-xl font-semibold">
            Chat with us
          </button>
        </div>
      </div>

      <div className="lg:flex lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-xl font-bold">Delivery Address</h2>
          <p className="text-gray-800">
            {address?.name || "Name not available"}
          </p>
          <p className="text-gray-600">
            {address?.street || "Street not available"}
          </p>
          <p className="text-gray-600">
            {address?.city || "City not available"},{" "}
            {address?.state || "State not available"}
          </p>
          <p className="text-gray-600">
            {address?.country || "Country not available"} -{" "}
            {address?.postalCode || "Postal Code not available"}
          </p>
          <p className="text-gray-800">
            Phone number: {address?.phone || "Phone number not available"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">More actions</h2>
          <a href="#" className="text-blue-500">
            Share order details
          </a>
        </div>
      </div>

      <div className="mt-8 p-4 border rounded lg:px-5 ">
        {products?.map((product) => (
          <div
            key={product._id}
            className="lg:flex md:flex block justify-between items-center mb-4"
          >
            <div className="lg:w-1/2 md:w-1/2 w-full">
              <img
                className="w-40"
                src={`${URI}uploads/${product.image}`}
                alt={product.title}
              />
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full">
              <p className="text-xl font-bold">{product.productName}</p>
              {product.attributes.size.length > 0 && (
                <p className="text-gray-600">
                  Size: {product.attributes.size.join(", ")}
                </p>
              )}
              {product.attributes.color.length > 0 && (
                <p className="text-gray-600">
                  Color: {product.attributes.color.join(", ")}
                </p>
              )}
              <p className="text-xl font-bold">₹{product.price}</p>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              {status !== "cancelled" && (
                <button
                  className="mt-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition duration-300 ease-in-out"
                  onClick={cancelOrder}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="my-8 px-4">
          <StatusBar status={status} /> {/* Display status bar */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
