import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ShowCategoryWise from '../category/ShowCategoryWise';


export const RecentlyProduct = ({Subcategory}) => {
    const { pathname } = useLocation();
    const [categoriesData, setCategoriesData] = useState([]);
    useEffect(() => {
        fetchCategories(); // Fetch categories based on subcategory
      }, [Subcategory]);

      const URI = import.meta.env.VITE_API_URL;
    
      const fetchCategories = async () => {
        try {
          const resp = await axios.get(
            `${URI}api/admin/getProductBySubcategory/${Subcategory}`
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
    <ShowCategoryWise products={categoriesData} />
  )
}
