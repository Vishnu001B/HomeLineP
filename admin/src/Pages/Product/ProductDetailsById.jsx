import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

export const ProductDetailsById = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  
  const URI = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const fetch = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/products/${productId}`);
      setProduct(resp.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, [productId]);

  

  useEffect(() => {
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0 && heightNum > 0) {
      const area = widthNum * heightNum;
      const price = area * parseFloat(product?.price || 0);
      setCalculatedPrice(price);
    } else {
      setCalculatedPrice(null);
    }
  }, [width, height, product?.price]);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(price);
    const discount = discountPercentage / 100;
    return (priceNumber - priceNumber * discount).toFixed(2);
  };

  const originalPrice = product?.price || '0';
  const discountedPrice = calculateDiscountedPrice(originalPrice, parseFloat(product?.discount) || 0);

  const openImageModal = (img) => {
    setCurrentImage(img);
  };

 
  const handleThumbnailClick = (img) => {
    openImageModal(`${URI}uploads/${img}`);
    setCurrentImage(`${URI}uploads/${img}`);
  };


  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setCurrentImage(`${URI}uploads/${product.images[0]}`);
    }
  }, [product?.images]);

  return (
    <div className=" px-5 ">
      <div className="flex flex-wrap md:flex-nowrap justify-evenly gap-5">
        {/* Image Carousel and Thumbnails */}
        <div className="w-full md:w-1/2">
          {product?.images && product.images.length > 0 && (
            <>
              <Carousel
                showThumbs={false}
                showStatus={false}
                selectedItem={product.images.indexOf(currentImage.split('/').pop())}
                onChange={(index) =>
                  setCurrentImage(`${URI}uploads/${product?.images[index]}`)
                }
                className="my-4"
              >
                {product.images.map((img, index) => (
                  <div key={index} className="zoom-container" onClick={() => openImageModal(`${URI}uploads/${img}`)}>
                    <img src={`${URI}uploads/${img}`} alt={product.title} className="zoom-image" />
                  </div>
                ))}
              </Carousel>

              <div className="flex justify-center mt-4">
                {product.images.map((img, index) => (
                  <div key={index} className="zoom-container">
                    <img
                      src={`${URI}uploads/${img}`}
                      alt="Thumbnail"
                      className="w-20 h-20 cursor-pointer border-2 border-transparent zoom-image"
                      onClick={() => handleThumbnailClick(img)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 mt-5 flex flex-col justify-between h-full">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl font-thin mb-4">{product?.title}</h1>
            <p className="text-[#8E95B2] mb-4">SKU: {product?.skuCode}</p>
            <p className="my-4 text-[#D4B080] text-2xl">
              {parseFloat(product?.discount) > 0 ? (
                <>
                  <span className="text-red-400 text-lg">₹ {discountedPrice}</span>
                  <span className="text-gray-500 line-through px-2">₹ {originalPrice}</span>
                  <span className="text-green-500 text-sm">({parseFloat(product?.discount)}% OFF)</span>
                </>
              ) : (
                <span className="text-red-400 text-lg">₹ {originalPrice}</span>
              )}
              <span className="text-black px-4">(Price Inclusive Of All Taxes)</span>
            </p>

            <p className="mb-4">{product?.descriptions}</p>

            {product?.subcategory && (
              <p className="text-sm text-gray-500">Category: {product.subcategory.join(', ')}</p>
            )}

            {/* Display Additional Product Details */}
            <div className="grid  grid-cols-3 gap-4">
              <p className="text-sm"><strong>Special Category:</strong> {product?.specialsCategory?.join(', ') || 'N/A'}</p>
              <p className="text-sm"><strong>Pattern Number:</strong> {product?.patternNumber || 'N/A'}</p>
              <p className="text-sm"><strong>Roll Size:</strong> {product?.RollSize.map(roll => roll._id).join(', ') || 'N/A'}</p>
              <p className="text-sm"><strong>MRP Roll:</strong> ₹{product?.mrp_roll || 'N/A'}</p>
              <p className="text-sm"><strong>Quality:</strong> {product?.quality || 'N/A'}</p>
              <p className="text-sm"><strong>GSM:</strong> {product?.gsm || 'N/A'}</p>
              <p className="text-sm"><strong>Color:</strong> {product?.color || 'N/A'}</p>
              <p className="text-sm"><strong>End Use:</strong> {product?.endUse || 'N/A'}</p>
              <p className="text-sm"><strong>Material:</strong> {product?.material || 'N/A'}</p>
              <p className="text-sm"><strong>Martindale:</strong> {product?.martindale || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
