import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import EditModal from "./EditModal";
import CreateTestimonialModal from "./CreateTestimonialModal";
import { Button, Spinner, Alert } from "react-bootstrap";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const URI = import.meta.env.VITE_API_URL;

  // Fetch testimonials from the API
  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${URI}api/quotes/new-quotes`);
        setTestimonials(response.data);
      } catch (error) {
        setError("Error fetching testimonials. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [URI]);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URI}api/quotes/new-quotes/${id}`);
      setTestimonials(
        testimonials.filter((testimonial) => testimonial._id !== id)
      );
    } catch (error) {
      console.error("Error deleting testimonial", error);
    }
  };

  // Open Modal for Editing
  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowEditModal(true);
  };

  // Close Modals
  const closeEditModal = () => setShowEditModal(false);
  const closeCreateModal = () => setShowCreateModal(false);

  // Handle Update (PUT)
  const handleUpdate = async (updatedTestimonial) => {
    try {
      await axios.put(
        `${URI}api/quotes/new-quotes/${updatedTestimonial._id}`,
        updatedTestimonial
      );
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial._id === updatedTestimonial._id
            ? updatedTestimonial
            : testimonial
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating testimonial", error);
    }
  };

  // Handle successful creation of a testimonial
  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    axios.get(`${URI}api/quotes/new-quotes`).then((response) => {
      setTestimonials(response.data);
    });
  };

  // Slider settings for responsive design
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 my-2 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <Button
        className="p-4 bg-blue-600 rounded-md mr-16 text-cyan-50 "
          onClick={() => setShowCreateModal(true)}
          variant="primary"
        >
          Create Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="relative p-4">
              <TestimonialCard
                photo={`${URI}${testimonial.authorImage}`}
                name={testimonial.author}
                date={new Date(testimonial.date).toLocaleDateString()}
                rating={testimonial.rating}
                description={testimonial.quote}
              />
              <div className="absolute top-0 right-0 flex space-x-2 p-2 bg-white rounded-md shadow">
                <AiFillEdit
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                  onClick={() => handleEdit(testimonial)}
                />
                <AiFillDelete
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  onClick={() => handleDelete(testimonial._id)}
                />
              </div>
            </div>
          ))}
        </Slider>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedTestimonial && (
        <EditModal
          testimonial={selectedTestimonial}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
        />
      )}

      {/* Create Testimonial Modal */}
      {showCreateModal && (
        <CreateTestimonialModal
          show={showCreateModal}
          onClose={closeCreateModal}
          onCreate={handleCreateSuccess}
        />
      )}
    </div>
  );
};

export default Testimonials;
