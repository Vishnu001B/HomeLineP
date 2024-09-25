import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FurnitureRange = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${URI}api/furnitureSubcatogry/subcategories`);
        setCategories(res.data);
      } catch (err) {
        setError("Failed to fetch categories. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Explore Our Furniture Range
      </h2>
      {loading ? (
        <div className="text-center text-lg">Loading categories...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-lg">No categories available.</div>
      ) : (
        <div className="flex justify-center items-center content-center flex-wrap gap-8 text-center">
          {categories.map((category) => (
            <div
              key={category.name}
             
            >
              <img 
                src={category.image ? `${URI}${category.image}` : "/path/to/default/icon.png"} 
                alt={category.name} 
                className={`flex flex-col items-center content-center transition-transform duration-300 ease-in-out rounded-full w-20 h-20 ${
                  category.highlight ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600 cursor-pointer"
                } hover:scale-105 hover:shadow-lg`}
               onClick={()=>navigate(`/subcategory/${category.name}/shop-in-bangalore`)}/>
              <span className="text-md font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FurnitureRange;
