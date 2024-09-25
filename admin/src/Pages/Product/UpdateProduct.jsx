import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const UpdateProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      descriptions: '',
      categories: '',
      subcategory: '',
      price: '',
      discount: '',
      totalPrice: '',
      skuCode: '',
      rating: '',
      productCollection: '',
      patternNumber: '',
      RollSize: '',
      mrp_roll: '',
      quality: '',
      color: '',
      endUse: '',
      compositions: '',
      gsm: '',
      martindale: '',
      material: '',
      specialsCategory: '',
    }
  });
  
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); 
  const location = useLocation();
  const { product } = location.state || {};  // Corrected spelling

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || '',
        descriptions: product.descriptions || '',
        categories: product.categories || '',
        subcategory: product.subcategory || '',
        price: product.price || '',
        discount: product.discount || '',
        totalPrice: product.totalPrice || '',
        skuCode: product.skuCode || '',
        rating: product.rating || '',
        productCollection: product.productCollection || '',
        patternNumber: product.patternNumber || '',
        RollSize: product.RollSize || '',
        mrp_roll: product.mrp_roll || '',
        quality: product.quality || '',
        color: product.color || '',
        endUse: product.endUse || '',
        compositions: product.compositions || '',
        gsm: product.gsm || '',
        martindale: product.martindale || '',
        material: product.material || '',
        specialsCategory: product.specialsCategory || '',
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append images to formData
    images.forEach((image) => {
      formData.append('files', image);  // Make sure the key matches what multer expects
    });

    try {
      const response = await axios.put(`${URI}api/admin/products/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product updated successfully', response.data);
      navigate("/products");  // Corrected spelling
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className=" mx-auto p-6">
      <div className='flex justify-between content-center items-center my-4 '>
        <h1 className="text-2xl font-bold mb-6">Update Product</h1>
        <Button onClick={() => { navigate(-1) }}>
          Back
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className='grid grid-cols-1 gap-4'>
          {/* Title */}
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
              <input
                id="title"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('title')}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="descriptions" className="block text-sm font-medium text-white">Description</label>
              <textarea
                id="descriptions"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('descriptions')}
              />
            </div>

            {/* Categories */}
            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-white">Categories</label>
              <input
                id="categories"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('categories')}
              />
            </div>

            {/* Subcategory */}
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-white">Subcategory</label>
              <input
                id="subcategory"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('subcategory')}
              />
            </div>

            <div>
              <label htmlFor="specialsCategory" className="block text-sm font-medium text-white">specialsCategory</label>
              <input
                id="specialsCategory"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('specialsCategory')}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
              <input
                id="price"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('price')}
              />
             
            </div>

            {/* Discount */}
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-white">Discount</label>
              <input
                id="discount"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('discount', { valueAsNumber: true })}
              />
            </div>

         

            {/* SKU Code */}
            <div>
              <label htmlFor="skuCode" className="block text-sm font-medium text-white">SKU Code</label>
              <input
                id="skuCode"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('skuCode')}
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-white">Rating</label>
              <input
                id="rating"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('rating')}
              />
            </div>

            {/* Product Collection */}
            <div>
              <label htmlFor="productCollection" className="block text-sm font-medium text-white">Product Collection</label>
              <input
                id="productCollection"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('productCollection')}
              />
            </div>

            {/* Pattern Number */}
            <div>
              <label htmlFor="patternNumber" className="block text-sm font-medium text-white">Pattern Number</label>
              <input
                id="patternNumber"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('patternNumber')}
              />
            </div>

            {/* Roll Size */}
            <div>
              <label htmlFor="RollSize" className="block text-sm font-medium text-white">Roll Size</label>
              <input
                id="RollSize"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('RollSize')}
              />
            </div>

            {/* MRP Roll */}
            <div>
              <label htmlFor="mrp_roll" className="block text-sm font-medium text-white">MRP Roll</label>
              <input
                id="mrp_roll"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('mrp_roll', { valueAsNumber: true })}
              />
            </div>

            {/* Quality */}
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-white">Quality</label>
              <input
                id="quality"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('quality')}
              />
            </div>

            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-white">Color</label>
              <input
                id="color"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('color')}
              />
            </div>

            {/* End Use */}
            <div>
              <label htmlFor="endUse" className="block text-sm font-medium text-white">End Use</label>
              <input
                id="endUse"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('endUse')}
              />
            </div>

            {/* Compositions */}
            <div>
              <label htmlFor="compositions" className="block text-sm font-medium text-white">Compositions</label>
              <input
                id="compositions"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('compositions')}
              />
            </div>

            {/* GSM */}
            <div>
              <label htmlFor="gsm" className="block text-sm font-medium text-white">GSM</label>
              <input
                id="gsm"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('gsm')}
              />
            </div>

            {/* Martindale */}
            <div>
              <label htmlFor="martindale" className="block text-sm font-medium text-white">Martindale</label>
              <input
                id="martindale"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('martindale')}
              />
            </div>

            {/* Material */}
            <div>
              <label htmlFor="material" className="block text-sm font-medium text-white">Material</label>
              <input
                id="material"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('material')}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-white">Upload Images</label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Update Product</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
