import React, { useState } from "react";

const EditModal = ({ testimonial, onClose, onUpdate }) => {
  const [author, setAuthor] = useState(testimonial.author);
  const [quote, setQuote] = useState(testimonial.quote);
  const [rating, setRating] = useState(testimonial.rating);

  const handleSubmit = () => {
    const updatedTestimonial = {
      ...testimonial,
      author,
      quote,
      rating,
    };
    onUpdate(updatedTestimonial);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-bold mb-4">Edit Testimonial</h3>
        <label className="block mb-2 font-bold">Author</label>
        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label className="block mb-2 font-bold">Quote</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <label className="block mb-2 font-bold">Rating</label>
        <input
          className="w-full p-2 border rounded mb-4"
          type="number"
          max="5"
          min="1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
