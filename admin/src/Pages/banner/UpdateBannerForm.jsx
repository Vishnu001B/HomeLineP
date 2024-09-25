import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Adjust import path as needed

const UpdateBannerForm = ({ isOpen, onClose, banner, onBannerUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || '',
        description: banner.description || '',
        file: null,
      });
    }
  }, [banner]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, description, file } = formData;

 

    const form = new FormData();
    form.append('file', file);
    form.append('title', title);
    form.append('description', description);

    try {
      await axios.put(`${URL}api/admin/banners/${banner._id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onBannerUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${!isOpen && 'hidden'}`}>
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Update Banner</h2>
          <Button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </Button>
        </div>
        
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
             
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              
            />
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              accept="image/*"
              
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
              Update Banner
            </Button>
            <Button onClick={onClose} className="bg-gray-300 text-gray-700 hover:bg-gray-400">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBannerForm;
