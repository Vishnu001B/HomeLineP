import React, { useEffect, useState } from "react";
import axios from "axios";
import Chandeliers from "./Chandeliers";
import { useLocation, useParams } from "react-router-dom";
import ShowCategoryWise from "./ShowCategoryWise";
import CategoryBanner from "./categoryBanner";
import FurnitureRange from "../FurnitureRange";

const CategoryDetails = () => {
  const { name } = useParams();
  const { pathname } = useLocation();
  const URI = import.meta.env.VITE_API_URL;
  const [categoriesData, setCategoriesData] = useState([]);

  // Use `name` from the URL or fallback to a default category name
  const selectName = name || "defaultCategory";

  useEffect(() => {
    fetchCategories();
  }, [selectName]);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(
        `${URI}api/admin/getProductByCatogry/${selectName}`
      );
      if (resp.data.success) {
        setCategoriesData(resp.data.productsByCategory);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="pt-32 bg-[#ddd8c4]">
      {selectName && (
        <>
          <CategoryBanner title="Our Products" />
          <Chandeliers name={selectName} />

          {/* Conditionally render FurnitureRange only if category is 'furniture' */}
          {selectName.toLowerCase() === "furniture" && <FurnitureRange />}
        </>
      )}

      <ShowCategoryWise products={categoriesData} />
    </div>
  );
};

export default CategoryDetails;
