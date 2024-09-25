import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const AddSubcatogryModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    onSave(formData);
    onClose();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            required
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

export default AddSubcatogryModal;
