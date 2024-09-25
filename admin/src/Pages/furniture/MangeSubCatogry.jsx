import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSubcatogryModal from './AddSubcatogryModal';
import UpdateSubCategoryModal from './UpdateSubCategoryModal';

const MangeSubCatogry = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items to display per page
  const URI = import.meta.env.VITE_API_URL;

  // Fetch categories from the server
  useEffect(() => {
    axios.get(`${URI}api/furnitureSubcatogry/subcategories`).then((res) => {
      console.log(res.data);
      setCategories(res.data);
      setFilteredCategories(res.data); // Initialize filtered categories
    }).catch(err => {
      console.error(err);
    });
  }, []);

  // Search handler
  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, categories]);

  // Add category handler
  const handleAddCategory = (newCategory) => {
    axios.post(`${URI}api/furnitureSubcatogry/subcategory`, newCategory).then((res) => {
      setCategories([...categories, res.data]);
      setFilteredCategories([...filteredCategories, res.data]); // Update filtered categories as well
    });
  };

  // Update category handler
  const handleUpdateCategory = (updatedCategory) => {
    axios.put(`${URI}api/furnitureSubcatogry/subcategory/${selectedCategory._id}`, updatedCategory).then((res) => {
      const updatedCategories = categories.map((cat) =>
        cat._id === selectedCategory._id ? res.data : cat
      );
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories); // Update filtered categories as well
    });
  };

  // Delete category handler
  const handleDeleteCategory = (id) => {
    axios.delete(`${URI}api/furnitureSubcatogry/subcategory/${id}`).then(() => {
      const updatedCategories = categories.filter((cat) => cat._id !== id);
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories); // Update filtered categories as well
    });
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen transition-all duration-300">
      <h2 className="text-3xl font-bold mb-6 text-start">Manage Subcategories</h2>
      <div className='flex justify-between items-center  content-center mb-4'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 w-1/2 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500  text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-blue-600 ml-2"
        >
          Add Subcategory
        </button>
      </div>
      <div className="mt-4 flex justify-center items-center content-center flex-wrap gap-4">
        {Array.isArray(currentCategories) && currentCategories.length > 0 ? (
          currentCategories.map((category) => (
            <div key={category._id} className="transform transition-transform duration-300 hover:scale-105 p-4 border rounded-lg shadow-md bg-white flex flex-col items-center">
              <img src={`${URI}${category.image}`} alt={category.name} className="w-full h-32 object-cover mb-4 rounded-lg" />
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <div className="flex justify-center gap-5 mt-2 w-full">
                <button 
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsUpdateModalOpen(true);
                  }} 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-600"
                >
                  Update
                </button>
                <button 
                  onClick={() => handleDeleteCategory(category._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="mx-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isAddModalOpen && (
        <AddSubcatogryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddCategory}
        />
      )}

      {isUpdateModalOpen && selectedCategory && (
        <UpdateSubCategoryModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          category={selectedCategory}
          onSave={handleUpdateCategory}
        />
      )}
    </div>
  );
};

export default MangeSubCatogry;
