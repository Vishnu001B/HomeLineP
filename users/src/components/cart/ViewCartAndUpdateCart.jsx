import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bagActions } from "../../store/bagSlice";
import CustomizedSteppers from "../CustomizedSteppers";

const ViewCartAndUpdateCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.bag) || { totalQuantity: 0, data: [] };
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const URI = import.meta.env.VITE_API_URL;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      const currentItem = bag.data.find(item => item._id === productId);
      if (currentItem) {
        if (newQuantity > currentItem.quantity) {
          // Increase quantity
          dispatch(bagActions.increaseQuantity({ _id: productId }));
        } else {
          // Decrease quantity
          dispatch(bagActions.decreaseQuantity({ _id: productId }));
        }
      }
    }
  };

  const applyCoupon = () => {
    // Example: Implement coupon validation here
    setDiscount(couponCode === "SAVE5" ? 5 : 0);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      return parseFloat(price.replace(/,/g, '').trim()) || 0;
    }
    console.error('Invalid price format:', price);
    return 0;
  };

  const calculateTotal = () => {
    let total = bag.data.reduce((acc, item) => {
      const price = formatPrice(item.price);
      return acc + price * item.quantity;
    }, 0);
    return total - (total * (discount / 100));
  };

  return (
    <>
      <div className='lg:pt-52 md:pt-40 pt-32'>
        <CustomizedSteppers />
      </div>
      <div className="p-4 md:flex md:justify-between md:gap-10">
        <div className="space-y-4 w-full md:w-8/12 border-y-2 border-gray-300 p-2">
          {bag.data && bag.data.length > 0 ? (
            bag.data.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-gray-200 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`${URI}uploads/${item.image}`} // Ensure the correct image URL
                    alt={item.title} // Changed from name to title
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <h3 className="font-semibold text-lg">{item.title}</h3> {/* Changed from name to title */}
                </div>
                <div className="flex items-center gap-4">
                  <label htmlFor={`quantity-${item._id}`} className="text-sm">Quantity:</label>
                  <input
                    id={`quantity-${item._id}`} // Changed from item.id to item._id
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                    className="w-16 border rounded p-1 text-center"
                    min="1"
                  />
                </div>
                <p className="text-lg font-semibold">Rs {formatPrice(item.price).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>

        <div className="mt-6 md:w-4/12">
          <div className="border-y-2 border-gray-300 p-4 mb-8">
            <h1 className="text-xl font-semibold mb-4">Apply Coupon</h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                name="couponCode"
                placeholder="Apply coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border rounded px-4 py-2 h-12"
              />
              <button
                onClick={applyCoupon}
                className="w-full md:w-auto bg-black text-white py-2 px-4 rounded mt-4 md:mt-0"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="border-y-2 border-gray-300 bg-gray-100 rounded-lg p-4">
            <h1 className="text-xl font-semibold mb-4">Summary</h1>
            <hr className="my-2" />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-lg">Subtotal</p>
                <p className="text-lg">Rs {calculateTotal().toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Discount</p>
                <p className="text-lg">({discount}%)</p>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <p className="text-lg">Total</p>
                <p className="text-lg">Rs {calculateTotal().toFixed(2)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/CheckoutForm")}
            className="w-full bg-red-400 text-white py-2 rounded mt-6 text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewCartAndUpdateCart;
