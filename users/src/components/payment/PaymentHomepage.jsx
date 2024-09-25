import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaUniversity,
  FaCreditCard,
  FaCcVisa,
  FaGoogleWallet,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomizedSteppers from "../CustomizedSteppers";
import Swal from "sweetalert2";
import { bagActions } from "../../store/bagSlice";

const PaymentHomepage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.bag) || {
    totalQuantity: 0,
    data: [],
  };

  const userId = localStorage.getItem("userId");
  const address = JSON.parse(localStorage.getItem("selectedAddress")) || {};

  const URI = import.meta.env.VITE_API_URL;

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const formatPrice = (price) => {
    return typeof price === "string"
      ? parseFloat(price.replace(/,/g, "").trim()) || 0
      : price;
  };

  const calculateTotal = () => {
    return bag.data.reduce((acc, item) => {
      const price = formatPrice(item.price);
      return acc + price * (item.quantity || 1);
    }, 0);
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${URI}api/user/${userId}`);
      dispatch(bagActions.clearBag());
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  const placeOrder = async () => {
    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Select Payment Method",
        text: "Please select a payment method before proceeding.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const products = bag.data.map((item) => ({
      productId: item.productId,

      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      attributes: {
        size: item.size || item.attributes?.size,
        color: item.color || item.attributes?.color,
      },
    }));

    const orderData = {
      userId,
      address: address._id,
      products,
      paymentMethod,
      paymentStatus: "unpaid",
      status: "pending",
    };

    try {
      await axios.post(`${URI}api/productOrder/orderProduct`, orderData);
      await clearCart();
      Swal.fire({
        icon: "success",
        title: "Order placed successfully!",
        text: "Generating success SMS.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/user-Profile/MyOrder");
    } catch (error) {
      console.error("Error placing the order:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const getTextColor = (method) =>
    paymentMethod === method ? "text-blue-600 font-semibold" : "text-gray-800";

  const cartSubtotal = calculateTotal();
  const shippingCost = 0; // Assuming free shipping for this example
  const orderTotal = cartSubtotal + shippingCost;

  return (
    <>
      <div className="pt-40 pb-10">
        <CustomizedSteppers />
      </div>
      <h2 className="text-4xl font-semibold mb-4 text-center ">
        Select Payment Method
      </h2>
      <div className="payment-bill-container p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md flex flex-col md:flex-row">
        <div className="payment-methods w-full md:w-1/2 p-6 ">
          {[
            "Cash on Delivery",
            "Net Banking",
            "Card Payment",
            "Credit Card",
            "UPI",
          ].map((method) => (
            <div
              key={method}
              onClick={() => handlePaymentChange(method)}
              className={`mb-4 flex items-center cursor-pointer text-2xl ${getTextColor(
                method
              )}`}
            >
              {method === "Cash on Delivery" && (
                <FaMoneyBillWave className="text-green-500 text-5xl mr-4" />
              )}
              {method === "Net Banking" && (
                <FaUniversity className="text-blue-500 text-5xl mr-4" />
              )}
              {method === "Card Payment" && (
                <FaCreditCard className="text-purple-500 text-5xl mr-4" />
              )}
              {method === "Credit Card" && (
                <FaCcVisa className="text-blue-700 text-5xl mr-4" />
              )}
              {method === "UPI" && (
                <FaGoogleWallet className="text-red-500 text-5xl mr-4" />
              )}
              {method}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 ">
          {bag.data.length > 0 && (
            <>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold">Summary</h3>
                <div className="flex justify-between mt-2">
                  <p className="text-sm">Cart Subtotal</p>
                  <p className="text-sm">Rs. {cartSubtotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm">Free</p>
                </div>
                <div className="flex justify-between mt-2 font-semibold">
                  <p className="text-sm">Order Total</p>
                  <p className="text-sm">Rs. {orderTotal.toLocaleString()}</p>
                </div>
              </div>
            </>
          )}
          <button
            onClick={placeOrder}
            className="w-full bg-red-400 text-white py-3 rounded mt-6 text-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentHomepage;
