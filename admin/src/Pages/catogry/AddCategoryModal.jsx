import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const AddCategoryModal = ({ isOpen, onClose, onSave }) => {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState(['']);
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    subcategories.forEach((subcategory, index) => {
      formData.append(`subcategories[${index}]`, subcategory);
    });
    images.forEach((image, index) => {
      formData.append(`files`, image);
    });

    onSave(formData);
    setCategory('');
    setSubcategories(['']);
    setImages([]);
    onClose();
  };

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, '']);
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index] = value;
    setSubcategories(updatedSubcategories);
  };

  const handleRemoveSubcategory = (index) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed text-black inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subcategories</label>
            {subcategories.map((subcategory, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveSubcategory(index)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddSubcategory} className="text-blue-500">
              + Add Subcategory
            </Button>
          </div>

          

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
