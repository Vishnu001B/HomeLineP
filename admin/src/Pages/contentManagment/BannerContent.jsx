import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // You can install Modal using `npm install react-modal`

const BannerContent = () => {
  const URI = import.meta.env.VITE_API_URL;
  const [bannerData, setBannerData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState({ title: '', description: '', _id: '' });
  const [updatedBanner, setUpdatedBanner] = useState({ title: '', description: '' });

  // Fetch banner content
  useEffect(() => {
    const fetchBannerContent = async () => {
      try {
        const response = await axios.get(`${URI}api/content-banner`);
        setBannerData(response.data);
      } catch (error) {
        console.error('Error fetching banner content:', error);
      }
    };
    fetchBannerContent();
  }, []);

  // Open modal for updating
  const openModal = (banner) => {
    setCurrentBanner(banner);
    setUpdatedBanner({ title: banner.title, description: banner.description });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URI}api/content-banner/${currentBanner._id}`, updatedBanner);
      setBannerData((prevData) =>
        prevData.map((banner) =>
          banner._id === currentBanner._id ? { ...banner, ...updatedBanner } : banner
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  // Delete banner
  const deleteBanner = async (id) => {
    try {
      await axios.delete(`${URI}api/content-banner/${id}`);
      setBannerData(bannerData.filter((banner) => banner._id !== id));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Banner Content</h1>
      {bannerData.length > 0 ? (
        bannerData.map((banner) => (
          <div key={banner._id} className="p-4 border-b mb-4">
            <h2 className="text-xl font-semibold">{banner.title}</h2>
            <p className="mb-2">{banner.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => openModal(banner)}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => deleteBanner(banner._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No banner content available.</p>
      )}

      {/* Modal for updating banner */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Banner"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Update Banner</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <label>
            Title:
            <input
              type="text"
              value={updatedBanner.title}
              onChange={(e) => setUpdatedBanner({ ...updatedBanner, title: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={updatedBanner.description}
              onChange={(e) => setUpdatedBanner({ ...updatedBanner, description: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded mt-2"
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BannerContent;
