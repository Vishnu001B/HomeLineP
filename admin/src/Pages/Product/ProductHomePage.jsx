import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProductHomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/products`);
      const productData = resp.data;
      setProducts(productData);
      setFilteredProducts(productData);

      // Extract unique categories from the product data
      const uniqueCategories = [
        ...new Set(productData.map((product) => product.categories)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategories(category);
    filterProducts(category, searchQuery);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterProducts(selectedCategories, query);
  };

  const filterProducts = (category, query) => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((product) => product.categories === category);
    }

    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.descriptions.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="lg:px-20 md:px-20 px-5 py-5  bg-blue-300">
      <div className="flex flex-col md:flex-row justify-between content-center items-center my-4 px-10 ">
        <div className="flex items-center mb-4 md:mb-0 ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by tittle "
            className="p-2 text-black border rounded mr-4"
          />
          <select
            value={selectedCategories}
            onChange={handleCategoryChange}
            className="p-2 text-black border rounded"
          >
            <option value="All">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category} className="text-black">
                {category}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={() => navigate("/create-product")}>ADD Product</Button>
      </div>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1 relative">
        {filteredProducts.map((prod) => (
          <ProductDetails
            key={prod._id}
            product={prod}
            fetchProduct={fetchProducts}
          />
        ))}
      </div>
    </div>
  );
};
