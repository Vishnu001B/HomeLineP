// src/components/MiniDrawer.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

// Categories data
const categories = [
  {
    name: "Services",
    subcategories: [
      "Curtain Stitching",
      "Curtains and Bracket Installation",
      "Wallpapers Installations",
      "Wooden Flooring Installation",
      "Carpets Installation",
      "All Furniture Works",
      "Electric Works",
    ],
  },
  {
    name: "Interior Design",
    subcategories: [
      "Full Home Interior",
      "Wardrobe",
      "Kitchen",
      "Living Room",
      "False Ceiling",
      "Interior Lighting",
    ],
  },
  {
    name: "Curtains",
    subcategories: ["Readymade Curtains", "Customized Curtains"],
  },
  {
    name: "Blinds",
    subcategories: [
      "Roman Blinds",
      "Zebra Blinds",
      "Wooden Blinds",
      "PVC Blinds",
      "Roller Blinds",
    ],
  },
  {
    name: "Mattress",
    subcategories: ["Peps Mattress"],
  },
  {
    name: "Store Locator",
    subcategories: ["Dining Tables", "Dining Chairs", "Buffets"],
  },
  {
    name: "Wallpapers",
    subcategories: [
      "Customized Wallpapers",
      "Imported Wallpapers",
      "Foam Panels",
      "Kitchen Wallpapers",
      "Bathroom Wallpapers",
    ],
  },
  {
    name: "Furniture",
    subcategories: [
      "Customized Sofa Set",
      "Customized Bed",
      "Customized Dining Table & Chair",
    ],
  },
  {
    name: "Flooring",
    subcategories: [
      "Wooden Flooring",
      "Vinyl Flooring",
      "Artificial Grass",
      "Wall-to-wall Carpet",
      "Carpet Tiles",
      "Handmade Carpets",
      "Gym Tiles",
    ],
  },
];

const MiniDrawer = ({ isOpen, onClose }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryClick = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div
      className={`fixed top-0 z-40 left-0 h-full w-64 bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Menu</h2>
        <button className="text-2xl" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <ul className="p-4 space-y-2">
        {/* Categories */}
        <li>
          <button
            className="w-full text-left p-2 rounded hover:bg-gray-700 transition duration-200"
            onClick={() => handleCategoryClick(null)}
          >
            Categories
          </button>
          {categories.map((category, index) => (
            <div key={category.name} className="relative">
              <button
                className="w-full text-left p-2 rounded hover:bg-gray-700 transition duration-200"
                onClick={() => handleCategoryClick(index)}
              >
                {category.name}
              </button>
              {openCategory === index && (
                <ul className="pl-4 mt-2 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <Link
                        to={`/category/${encodeURIComponent(subcategory)}`}
                        className="block p-2 rounded hover:bg-gray-600 transition duration-200"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </li>

        {/* Cart */}
        <li>
          <Link
            to="/cart"
            className="block p-2 rounded hover:bg-gray-700 transition duration-200"
          >
            Cart
          </Link>
        </li>

        {/* Profile */}
        <li>
          <Link
            to="/profile"
            className="block p-2 rounded hover:bg-gray-700 transition duration-200"
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MiniDrawer;
