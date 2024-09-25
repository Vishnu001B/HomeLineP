import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductDetailsModal from "../module/ProductDetailsModal";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { Snackbar, Alert } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { fetchItems } from '../../fetchItems';
import { motion } from 'framer-motion';

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const URI = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem('userId');

  // Function to calculate the discounted price
  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(price);
    const discount = parseFloat(discountPercentage) / 100;
    return (priceNumber - priceNumber * discount).toFixed(2);
  };

  const handleOnClick = (product) => {
    const discountedPrice = calculateDiscountedPrice(
      product.price,
      product.discount
    );
    setSelectedProduct({ ...product, discountedPrice });
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = async(product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to add products to the cart.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      const response = await axios.post(`${URI}api/user/addItemToCart`, {
        userId,
        productId: product._id,
        productName: product.title,
        quantity: 1,
        price: product.price,
        attributes: {
          size: product.size,
          color: product.color,
        },
        discount: product.discount,
        image: product.images[0],
      });
      fetchItems(dispatch);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const path = decodeURIComponent(location.pathname);


  const handleOnClickImg = (product) => {
    navigate("/productDetails/shop-in-bangalore", { state: { product } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 bg-[#f1ede8]">
      {products.map((product) => {
        const { discount, title, price, images } = product;
        const originalPrice = price;
        const discountedPrice = calculateDiscountedPrice(
          originalPrice,
          discount
        );

        return (
          <motion.div
      key={product._id}
      className="border-2 border-gray-300 bg-gray-100 rounded-md my-10 shadow-lg overflow-hidden transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <motion.img
        src={`${URI}uploads/${product?.images[0]}`}
        alt={product.title}
        className="w-full h-96 mb-4 rounded-t-md cursor-pointer rounded-md"
        onClick={() => handleOnClickImg(product)}
        whileHover={{ scale: 1.1 }}
      />
      <div className="px-5">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2 mt-3">{title}</h3>

        {parseFloat(discountedPrice) < parseFloat(originalPrice) ? (
          <div className="flex justify-between items-center gap-2">
            <p className="text-gray-500 line-through mb-1 ">₹ {originalPrice}</p>
            <p className="text-[#50c878] font-bold mb-1 ">₹ {discountedPrice}</p>
            <p className=" mb-1 bg-green-600 rounded-md px-4 py-2 text-white justify-end">({discount}%) OFF</p>
          </div>
        ) : (
          <p className="text-red-400 mb-1">₹ {originalPrice}</p>
        )}
      </div>
      <div
        className={`mt-4 flex w-full my-4 px-5 gap-2 ${
          path !== "/category/InteriorDesign" && path !== "/category/Interior Design"
            ? "justify-center"
            : "justify-between"
        }`}
      >
        <button
          onClick={() => handleOnClick(product)}
          className="border-2 hover:border-none border-black rounded-md text-sm text-black py-1 px-4 hover:bg-green-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5 bg-[#50c878] hover:bg[#7bf1a8]"
        >
          Book Now
        </button>

        {path !== "/category/InteriorDesign" && path !== "/category/Interior Design" && (
          <button
            onClick={() => handleAddToCart(product)}
            className="border-2 hover:border-none border-black rounded-md text-black py-1 px-4 hover:bg-red-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-2 bg-[#d8a48f]"
          >
            <FaCartPlus className="text-xl" />
            {/* <p className="text-sm">Add to Cart</p> */}
          </button>
        )}
      </div>
    </motion.div>
        );
      })}

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowCategoryWise;
