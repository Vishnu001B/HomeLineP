import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert, Button } from "@mui/material";
import { bagActions } from "../../store/bagSlice";
import { ProductInfo } from "./ProductInfo";
import axios from "axios";
import { RecentlyProduct } from "./RecentlyProduct";
import ReviewComponent from "./ReviewComponent";
import { fetchItems } from '../../fetchItems';
import { Helmet } from "react-helmet";

// Set up the app element for accessibility
Modal.setAppElement("#root");

const ProductDetails = () => {
  const dispatch = useDispatch();
  const bagItem = useSelector((store) => store.bag);
  const location = useLocation();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { product } = location.state || {};
  const URI = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0 && heightNum > 0) {
      const area = widthNum * heightNum;
      const price = area * parseFloat(product?.price);
      setCalculatedPrice(price);
    } else {
      setCalculatedPrice(null);
    }
  }, [width, height, product?.price]);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    let priceNumber;
    if (typeof price === "string") {
      priceNumber = parseFloat(price.replace(/,/g, ""));
    } else {
      priceNumber = parseFloat(price);
    }
    const discount = discountPercentage / 100;
    return (priceNumber - priceNumber * discount).toFixed(2);
  };

  const originalPrice = product?.price || "0";
  const discountedPrice = calculateDiscountedPrice(
    originalPrice,
    parseFloat(product?.discount) || 0
  );

  const addIntobag = async () => {
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
            quantity, // Use the selected quantity
            price: product.price,
            attributes: {
                size: product.size,
                color: product.color,
            },
            discount: product.discount,
            image: currentImage || product.images[0], // Use the current image or fallback to the first image
        });

        fetchItems(dispatch);
        setOpenSnackbar(true);
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error',
            text: 'An error occurred while trying to add the product to your cart.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
};

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const openImageModal = (img) => {
    setCurrentImage(img);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const handleBookNow = () => {
    navigate("/CheckoutForm", {
      state: { product },
    });
  };

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setQuantity(value);
  };

  const handleThumbnailClick = (img) => {
    openImageModal(`${URI}uploads/${img}`);
    setCurrentImage(`${URI}uploads/${img}`); // Update current image to reflect selection
  };

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setCurrentImage(`${URI}uploads/${product.images[0]}`); // Set the first image as the default
    }
  }, [product?.images]);

  return (
    <div className="bg-[#fffcf7]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="flex flex-wrap md:flex-nowrap justify-evenly pt-40 gap-5 lg:px-[10%] px-5">
        <div className="w-full md:w-1/2">
        <div className="">
        <Carousel
          showThumbs={false}
          showStatus={false}
          selectedItem={product?.images.indexOf(currentImage.split('/').pop())} // Use index from the current image
          onChange={(index) => setCurrentImage(`${URI}uploads/${product?.images[index]}`)} // Update current image based on carousel change
          className="my-4"
        >
          {product?.images.map((img, index) => (
            <div key={index} className="zoom-container" onClick={() => openImageModal(`${URI}uploads/${img}`)}>
              <img src={`${URI}uploads/${img}`} alt={`${product.title}`} className="zoom-image" />
            </div>
          ))}
        </Carousel>
      </div>

          <div className="flex justify-center mt-4">
            {product?.images.map((img, index) => (
              <div key={index} className="zoom-container">
                <img
                  src={`${URI}uploads/${img}`}
                  alt="Thumbnail"
                  className="w-20 h-20 cursor-pointer border-2 border-transparent zoom-image"
                  onClick={() => handleThumbnailClick(img)} // Use the new click handler
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-5 flex flex-col justify-between h-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <div className="flex flex-col justify-center h-full">
          <Helmet>
        <title>{product?.title} - Buy Now at the Best Price</title>
        <meta name="description" content={`Purchase ${product?.title} at ₹${discountedPrice} (${product?.discount}% OFF). Available in various sizes and colors.`} />
        <meta name="keywords" content={`${product?.title}, ${product?.category}, Buy ${product?.title}, Discount ${product?.discount}, Best Price`} />
        <meta property="og:title" content={product?.title} />
        <meta property="og:description" content={`Get the best deal on ${product?.title}. Now available at ₹${discountedPrice}.`} />
    
        <meta property="og:url" content={window.location.href} />
      </Helmet>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-[#8E95B2] mb-2 font-bold">SKU: {product.skuCode}</p>
            <p className=" text-[#D4B080] text-2xl">
              {parseFloat(product?.discount) > 0 ? (
                <>
                  <span className="text-red-400 text-lg">₹ {discountedPrice}</span>
                  <span className="text-gray-500 line-through px-2 ">₹ {originalPrice}</span>
                  <span className="text-green-500 text-sm">({parseFloat(product?.discount)}% OFF)</span>
                </>
              ) : (
                <span className="text-red-400 text-lg">₹ {originalPrice}</span>
              )}
              <span className="text-black px-4">(Price Includes Of All Taxes)</span>
            </p>
          </div>

          {product?.category !== "InteriorDesgin" && (
            <>
              <div className="flex items-center gap-4 mt-4">
                <label htmlFor={`quantity-${product.id}`} className="text-lg">Quantity:</label>
                <input
                  id={`quantity-${product.id}`}
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 rounded p-1 text-center border-black border-[0.5px]"
                />
              </div>

              <div className="mb-4 pt-2">
                <p className="mb-2">Enter Dimensions:</p>
                <div className="flex gap-4 w-full">
                  <input
                    type="number"
                    placeholder="Width (ft)"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="px-4 w-full py-2 rounded-md border border-black  bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Height (ft)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="px-4 w-full py-2 rounded-md border border-black bg-white"
                  />
                </div>
                {calculatedPrice !== null && (
                  <p className="mt-4 text-[#D4B080] text-xl">
                    Total Price: ₹ {calculatedPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="my-4 flex gap-4">
            <a
              href="tel:6352396301"
              className="w-full py-4 bg-[#34b7f1] rounded-sm text-white flex justify-center items-center gap-5 rounded-xl shadow-xl hover:bg-white hover:text-black"
            >
              Call Now
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=6352396301&text=Hi%2C%20I%20am%20interested%20in%20your%20product%3A%20${product.name}`}
              className="hover:bg-white hover:text-black rounded-xl shadow-xl w-full py-4 bg-[#25D366] rounded-sm text-white flex justify-center items-center gap-5"
            >
              WhatsApp Now
            </a>
          </div>

          {product?.category !== "InteriorDesgin" ? (
            <div className="flex justify-center items-center content-center gap-4 ">
              <Button
                className="rounded-xl shadow-xl w-full flex justify-center items-center gap-5 hover:text-black"
                sx={{ backgroundColor: "#ff9800", color: "#fff", padding: "15px" }}
                onClick={addIntobag}
              >
                <FaShoppingCart />
                ADD TO BAG
              </Button>

              <Button
                className="rounded-xl shadow-xl w-full flex justify-center items-center gap-5 hover:text-black"
                sx={{ backgroundColor: "#1a73e8", color: "#fff", padding: "15px" }}
                onClick={handleBookNow}
              >
                BOOK NOW
              </Button>
            </div>
          ) : (
            <Button
              className="rounded-xl shadow-xl w-full flex justify-center items-center gap-5"
              sx={{ backgroundColor: "#1a73e8", color: "#fff", padding: "15px" }}
              onClick={handleBookNow}
            >
              BOOK NOW
            </Button>
          )}
          <div>
          <ProductInfo product={product}/>
          </div>
         
        </div>
        
      </div>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Product added to bag!
        </Alert>
      </Snackbar>

      <div className="mt-10 py-5 bg-[#001b2e] rounded-full ">
        <h1 className="lg:text-6xl text-3xl text-center font-bold mb-6 text-white">
            More Picks for You 
        </h1>
        <RecentlyProduct Subcategory={product.subcategory}/>
      </div>
      <div className="lg:px-[6%]">
        <ReviewComponent productId={product._id} />
      </div>

    
      
    </div>
  );
};

export default ProductDetails;
