import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const CreateTestimonialModal = ({ show, onClose, onCreate }) => {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", author);
    formData.append("rating", rating);
    formData.append("quote", quote);
    formData.append("file", image);

    try {
      await axios.post(`${URI}api/quotes/new-quotes`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreate(); // Reload testimonials after successful submission
      onClose(); // Close modal
    } catch (error) {
      console.error("Error creating testimonial", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered className="">
    
        <Modal.Title>Create New Testimonial</Modal.Title>
      <Modal.Body>
      <Form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
  <Form.Group controlId="formAuthor" className="mb-4">
    <Form.Label className="block text-lg font-semibold text-gray-700 mb-2">Author</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter author name"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </Form.Group>

  <Form.Group controlId="formRating" className="mb-4">
    <Form.Label className="block text-lg font-semibold text-gray-700 mb-2">Rating</Form.Label>
    <Form.Control
      type="number"
      placeholder="Enter rating"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      required
      min={1}
      max={5}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </Form.Group>

  <Form.Group controlId="formQuote" className="mb-4">
    <Form.Label className="block text-lg font-semibold text-gray-700 mb-2">Testimonial Quote</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      placeholder="Enter testimonial quote"
      value={quote}
      onChange={(e) => setQuote(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </Form.Group>

  <Form.Group controlId="formFile" className="mb-4">
    <Form.Label className="block text-lg font-semibold text-gray-700 mb-2">Upload Image</Form.Label>
    <Form.Control
      type="file"
      onChange={handleImageChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </Form.Group>

  <Button
    variant="primary"
    type="submit"
    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
  >
    Submit
  </Button>
</Form>

      </Modal.Body>
    </Modal>
  );
};

export default CreateTestimonialModal;
