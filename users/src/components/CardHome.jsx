import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

// Card Component
const Card = ({ img, title, index }) => {
  return (
    <motion.div
      className="w-full md:w-72 lg:w-72 xl:w-80 rounded-lg overflow-hidden card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1, delay: index * 0.05 }} // Faster entrance
      whileHover={{ scale: 1.15, rotate: 2, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="h-60 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <h3 className="p-4 text-lg font-semibold text-white text-center"> {/* Changed to text-white */}
        {title}
      </h3>
    </motion.div>
  );
};

// CardHome Component
const CardHome = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(`${URI}api/categories/`);
      setCategoriesData(resp.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="bg-[#00171f] lg:py-5 py-4 font-sans text-white rounded=md lg:rounded-full my-10">
     
      <h1 className="lg:text-3xl xl:text-4xl text-md text-center lg:pt-16 lg:pb-16 font-bold px-4 py-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
         <span className="text-5xl font-bold text-orange-500">Transform</span>  Your Space <span className="text-[#80ed99] text-4xl">,</span> Explore Our  <span className="text-5xl font-bold text-orange-500">Categories</span> 
      </h1>

      <div className="flex flex-wrap items-center justify-center lg:gap-6 xl:px-2 px-5">
        {categoriesData.map((data, index) => (
          <Link
            to={`/category/${data.category}/shop-in-bangalore`}
            key={index}
            className="flex flex-col items-center mb-6"
          >
            <Card
              img={`${URI}${data.images?.[0] || "placeholder-image.jpg"}`} // Use a placeholder image if none are provided.
              title={data.category}
              index={index}
            />

  <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.descriptions} />
        <meta name="keywords" content={categoriesData.map((data) => data.category).join(", ")} />
        <meta name="author" content="YourCompanyName" />
      </Helmet>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardHome;
