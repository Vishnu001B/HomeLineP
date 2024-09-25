import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus, FaTrash } from "react-icons/fa";

const UpdateCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const URI = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    category: "", // category name (not ID)
    images: null,
    subcategories: [],
    previewUrl: null,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        category: category.category || "", // Set category name
        images: null,
        subcategories: category.subcategories || [], // Set subcategories array
        previewUrl: category.images ? `${URI}/${category.images[0]}` : null, // Image preview
      });
    }
  }, [category]);

  // Handle input changes for category and image
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        [name]: file,
        previewUrl: previewUrl,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle subcategory input changes
  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...formData.subcategories];
    updatedSubcategories[index] = value;
    setFormData({ ...formData, subcategories: updatedSubcategories });
  };

  // Add new subcategory field
  const handleAddSubcategory = () => {
    setFormData({ ...formData, subcategories: [...formData.subcategories, ""] });
  };

  // Remove a subcategory
  const handleRemoveSubcategory = (index) => {
    const updatedSubcategories = [...formData.subcategories];
    updatedSubcategories.splice(index, 1); // Remove subcategory at index
    setFormData({ ...formData, subcategories: updatedSubcategories });
  };

  // Submit updated data to API
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("category", formData.category); // Send the category name
    
    if (formData.images) {
      data.append("files", formData.images); // Append image file correctly
    }

    formData.subcategories.forEach((sub, index) => {
      data.append(`subcategories[${index}]`, sub); // Append each subcategory
    });

    try {
      const response = await fetch(`${URI}api/categories/${category._id}`, {
        method: "PUT",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const result = await response.json();
      onSave(result); // Call onSave with updated data
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Modify the category details and save the changes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Category Name Input */}
          <div>
            <Label htmlFor="category">Category Name</Label>
            <Input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category name"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="images">Upload Image</Label>
            <Input
              type="file"
              name="images"
              id="images"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          {/* Image Preview */}
          {formData.previewUrl && (
            <div className="mt-4">
              <img
                src={formData.previewUrl}
                alt="Selected category"
                className="h-40 w-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* Subcategories List */}
          <div>
            <Label htmlFor="subcategory">Subcategories</Label>
            {formData.subcategories.map((sub, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={sub}
                  onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                  placeholder="Enter subcategory"
                />
                <Button variant="destructive" onClick={() => handleRemoveSubcategory(index)}>
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button variant="primary" onClick={handleAddSubcategory}>
              <FaPlus /> Add Subcategory
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="primary" onClick={handleSubmit}>
            <FaPlus /> Save Changes
          </Button>
          <Button variant="destructive" onClick={onClose}>
            <FaTrash /> Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;
