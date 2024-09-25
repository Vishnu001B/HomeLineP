import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const UpdateSubCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    if (category) {
      setUpdatedName(category.name || '');
      setUpdatedImage(category.image || null);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', updatedName);
    if (updatedImage && typeof updatedImage === 'object') {
      formData.append('image', updatedImage);
    }

    onSave(formData);
    onClose();
  };

  const handleImageChange = (e) => {
    setUpdatedImage(e.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
          />
          <label htmlFor="image" className="block mb-2 font-semibold">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            className="block mb-4"
            onChange={handleImageChange}
          />
          <div className="flex justify-between">
            <Button className="bg-red-500" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-green-500" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubCategoryModal;
