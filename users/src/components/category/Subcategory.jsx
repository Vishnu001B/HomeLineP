import React, { useEffect, useState } from "react";
import axios from "axios";
import Chandeliers from "./Chandeliers";
import { useLocation, useParams } from "react-router-dom";
import ShowCategoryWise from "./ShowCategoryWise";
import CategoryBanner from "./categoryBanner";

const Subcategory = () => {
  const { name } = useParams(); // Capture 'name' from URL
  const { pathname } = useLocation(); // Capture pathname for scroll-to-top
  const URI = import.meta.env.VITE_API_URL;
  const [categoriesData, setCategoriesData] = useState([]);

  // Decode 'name' from URL to ensure special characters like spaces are handled
  const selectName = name ? decodeURIComponent(name) : "defaultCategory";
  console.log(selectName, "select name");

  useEffect(() => {
    fetchCategories(); // Fetch categories based on subcategory
  }, [selectName]);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(
        `${URI}api/admin/getProductBySubcategory/${encodeURIComponent(
          selectName
        )}`
      );
      if (resp.data.success) {
        setCategoriesData(resp.data.productsBySubcategory); // Set the categories data
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when pathname changes
  }, [pathname]);

  return (
    <div className="pt-16">
      {selectName && (
        <>
          <CategoryBanner title="Our Products" />
          <Chandeliers name={selectName} />
        </>
      )}

      <ShowCategoryWise products={categoriesData} />
    </div>
  );
};

export default Subcategory;
