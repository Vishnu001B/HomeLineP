import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Initial categories and subcategories data
// const initialCategories = [
//   {
//     category: "Interior Design",
//     subcategories: [
//       "Full Home Interior",
//       "Wardrobe",
//       "Kitchen",
//       "Living Room",
//       "False Ceiling",
//       "Interior Lighting",
//     ],
//   },
//   {
//     category: "Curtains",
//     subcategories: ["Readymade Curtains", "Customized Curtains"],
//   },
//   {
//     category: "Blinds",
//     subcategories: [
//       "Roman Blinds",
//       "Zebra Blinds",
//       "Wooden Blinds",
//       "PVC Blinds",
//       "Roller Blinds",
//     ],
//   },
//   {
//     category: "Mattress",
//     subcategories: ["Peps Mattress"],
//   },
//   {
//     category: "Wallpapers",
//     subcategories: [
//       "Customized Wallpapers",
//       "Imported Wallpapers",
//       "Foam Panels",
//       "Kitchen Wallpapers",
//       "Bathroom Wallpapers",
//     ],
//   },
//   {
//     category: "Furniture",
//     subcategories: [
//       "Customized Sofa Set",
//       "Customized Bed",
//       "Customized Dining Table & Chair",
//     ],
//   },
//   {
//     category: "Flooring",
//     subcategories: [
//       "Wooden Flooring",
//       "Vinyl Flooring",
//       "Artificial Grass",
//       "Wall-to-wall Carpet",
//       "Carpet Tiles",
//       "Handmade Carpets",
//       "Gym Tiles",
//     ],
//   },
// ];

const specialsCategoryOptions = [
  { value: "Premium", label: "Premium" },
  { value: "Classic", label: "Classic" },
  { value: "Economic", label: "Economic" },
];

export const AddProduct = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const navigate = useNavigate();
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(`${URI}api/categories/`);
      setCategories(resp.data);
      console.log(setCategories(resp.data));
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };



  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append images to formData
    images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await axios.post(
        `${URI}api/admin/createProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added successfully", response.data);
      navigate("/Mange-product");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { category: newCategory, subcategories: [] },
      ]);
      setNewCategory("");
    }
  };

  const addSubcategory = () => {
    if (newSubcategory.trim() && selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.category === selectedCategory
            ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
            : cat
        )
      );
      setNewSubcategory("");
      setSelectedSubcategory(newSubcategory);
    }
  };

  return (
    <div className="  p-6  bg-[#feefe5] text-black w-full mx-5 rounded-md shadown-2xl">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Title */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-black"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="descriptions"
                className="block text-sm font-medium text-black"
              >
                Description
              </label>
              <textarea
                id="descriptions"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("descriptions")}
              />
            </div>

            {/* Category Selection */}
            {/* <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-black"
              >
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("category")}
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
                <option value="add-new-category">Add New Category</option>
              </select>
              {selectedCategory === "add-new-category" && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="block w-full border border-gray-300 text-black rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <Button type="button" onClick={addCategory} className="mt-2">
                    Add Category
                  </Button>
                </div>
              )}
            </div> */}

<div>
            <label htmlFor="category" className="block text-sm font-medium text-black">
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("category")}
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) && categories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
              <option value="add-new-category">Add New Category</option>
            </select>
            {selectedCategory === "add-new-category" && (
              <div className="mt-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                  className="block w-full border border-gray-300 text-black rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <Button type="button" onClick={addCategory} className="mt-2">
                  Add Category
                </Button>
              </div>
            )}
          </div>


            {/* Subcategory Selection */}
            {selectedCategory && selectedCategory !== "add-new-category" && (
              <div>
                <label
                  htmlFor="subcategory"
                  className="block text-sm font-medium text-black"
                >
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("subcategory")}
                  onChange={handleSubcategoryChange}
                  value={selectedSubcategory}
                >
                  <option value="">Select Subcategory</option>
                  {categories
                    .find((cat) => cat.category === selectedCategory)
                    ?.subcategories.map((sub, index) => (
                      <option key={index} value={sub}>
                        {sub}
                      </option>
                    ))}
                  <option value="add-new-subcategory">
                    Add New Subcategory
                  </option>
                </select>
                {selectedSubcategory === "add-new-subcategory" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newSubcategory}
                      onChange={(e) => setNewSubcategory(e.target.value)}
                      placeholder="Enter new subcategory"
                      className="block w-full border border-gray-300 text-black rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <Button
                      type="button"
                      onClick={addSubcategory}
                      className="mt-2"
                    >
                      Add Subcategory
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="specialsCategory"
                className="block text-sm font-medium text-black"
              >
                Specials Category
              </label>
              <select
                id="specialsCategory"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("specialsCategory")}
              >
                <option value="">Select Specials Category</option>
                {specialsCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-black"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Discount */}
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-black"
              >
                Discount
              </label>
              <input
                id="discount"
                type="number"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("discount", { valueAsNumber: true })}
              />
            </div>

            {/* SKU Code */}
            <div>
              <label
                htmlFor="skuCode"
                className="block text-sm font-medium text-black"
              >
                SKU Code
              </label>
              <input
                id="skuCode"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("skuCode")}
              />
            </div>

            {/* Rating */}
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-black"
              >
                Rating
              </label>
              <input
                id="rating"
                type="text"
                className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("rating")}
              />
            </div>

            {/* Product Collection */}
            <div>
              <label
                htmlFor="productCollection"
                className="block text-sm font-medium text-black"
              >
                Product Collection
              </label>
              <input
                id="productCollection"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("productCollection")}
              />
            </div>

            {/* Pattern Number */}
            <div>
              <label
                htmlFor="patternNumber"
                className="block text-sm font-medium text-black"
              >
                Pattern Number
              </label>
              <input
                id="patternNumber"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("patternNumber")}
              />
            </div>

            {/* Roll Size */}
            <div>
              <label
                htmlFor="RollSize"
                className="block text-sm font-medium text-black"
              >
                Roll Size
              </label>
              {/* Handling RollSize as a JSON string */}
              <textarea
                id="RollSize"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("RollSize")}
                placeholder='Format: [{"height": "value", "weight": "value"}]'
              />
            </div>

            {/* MRP Roll */}
            <div>
              <label
                htmlFor="mrp_roll"
                className="block text-sm font-medium text-black"
              >
                MRP Roll
              </label>
              <input
                id="mrp_roll"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("mrp_roll")}
              />
            </div>

            {/* Quality */}
            <div>
              <label
                htmlFor="quality"
                className="block text-sm font-medium text-black"
              >
                Quality
              </label>
              <input
                id="quality"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("quality")}
              />
            </div>

            {/* Color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-black"
              >
                Color
              </label>
              <input
                id="color"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("color")}
              />
            </div>

            {/* End Use */}
            <div>
              <label
                htmlFor="endUse"
                className="block text-sm font-medium text-black"
              >
                End Use
              </label>
              <input
                id="endUse"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("endUse")}
              />
            </div>

            {/* Compositions */}
            <div>
              <label
                htmlFor="compositions"
                className="block text-sm font-medium text-black"
              >
                Compositions
              </label>
              <input
                id="compositions"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("compositions")}
              />
            </div>

            {/* GSM */}
            <div>
              <label
                htmlFor="gsm"
                className="block text-sm font-medium text-black"
              >
                GSM
              </label>
              <input
                id="gsm"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("gsm")}
              />
            </div>

            {/* Martindale */}
            <div>
              <label
                htmlFor="martindale"
                className="block text-sm font-medium text-black"
              >
                Martindale
              </label>
              <input
                id="martindale"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("martindale")}
              />
            </div>

            {/* Material */}
            <div>
              <label
                htmlFor="material"
                className="block text-sm font-medium text-black"
              >
                Material
              </label>
              <input
                id="material"
                type="text"
                className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("material")}
              />
            </div>

            {/* Other Input Fields (Price, Discount, etc.) */}
            {/* Continue adding your input fields here... */}

            {/* Image Upload */}
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-black"
              >
                Upload Images
              </label>
              <input
                id="images"
                type="file"
                className="mt-1 block w-full  border text-white border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleImageChange}
                multiple
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="mt-4">
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
