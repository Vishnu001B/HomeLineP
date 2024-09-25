import React from "react";
import { useSelector } from "react-redux";
import CustomizedSteppers from "./CustomizedSteppers";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
  // Fetch bag data from the Redux store
  const { totalQuantity, data } = useSelector((store) => store.bag) || {
    totalQuantity: 0,
    data: [],
  };
  const location = useLocation();
  const product = location.state?.product;
  const URI = import.meta.env.VITE_API_URL;

  // Use `data` if available, otherwise use `product` from location state
  const newData = data.length > 0 ? data : product ? [product] : [];

  // Format price function
  const formatPrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      return parseFloat(price.replace(/,/g, "").trim()) || 0;
    }
    console.error("Invalid price format:", price);
    return 0;
  };

  // Calculate total price function
  const calculateTotal = () => {
    return newData.reduce((acc, item) => {
      const price = formatPrice(item.price);
      return acc + price * (item.quantity || 1); // Default quantity to 1 if undefined
    }, 0);
  };

  // Shipping cost and order total
  const shippingCost = 0; // Assuming free shipping for this example
  const cartSubtotal = calculateTotal();
  const orderTotal = cartSubtotal + shippingCost;

  return (
    <>
      <div className="lg:pt-52 md:pt-40 pt-32">
        <CustomizedSteppers />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8">
        {/* Shipping Details Form */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pincode
                </label>
                <input
                  type="number"
                  id="pincode"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip/Postal Code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-red-500 text-white rounded-md mt-4"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Product Details & Order Summary */}
        <div className="w-full lg:w-1/3">
          {newData.length > 0 && (
            <>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                {newData.map((item, index) => (
                  <div key={index} className="flex items-center mt-2">
                    {/* Adjust image source */}
                    <img
                      src={
                        item.image
                          ? `${URI}uploads/${item.image}`
                          : "/default-image.jpg"
                      } // Provide a fallback image if the image is missing
                      alt={item.productName || "Product Image"}
                      className="w-20 h-20 rounded-md"
                    />
                    <div className="ml-4">
                      <p className="text-sm">{item.productName}</p>
                      <p className="text-sm font-semibold">
                        Rs. {formatPrice(item.price).toLocaleString()}
                      </p>
                      <p className="text-sm">Qty: {item.quantity || 1}</p>
                      
                    </div>
                  </div>
                ))}
              </div>
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
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
