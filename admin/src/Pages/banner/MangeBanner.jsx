import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Adjust import path as needed
import BannerForm from './BannerForm'; // For adding new banners
import UpdateBannerForm from './UpdateBannerForm'; // For updating banners

const MangeBanner = () => {
  const [banners, setBanners] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const resp = await axios.get(`${URL}api/admin/banners`);
      if (Array.isArray(resp.data)) {
        setBanners(resp.data);
      } else {
        console.error('Unexpected response data:', resp.data);
        setBanners([]);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      setBanners([]);
    }
  };

  const handleBannerAdded = () => {
    fetchBanners();
    setShowAddForm(false);
  };

  const handleBannerUpdated = () => {
    fetchBanners();
    setShowUpdateForm(false);
    setSelectedBanner(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}api/admin/banners/${id}`);
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const handleUpdate = (banner) => {
    setSelectedBanner(banner);
    setShowUpdateForm(true);
  };

  return (
    <div className="w-full h-full px-5">
      <Button className="my-4 mx-5" onClick={() => setShowAddForm(true)}>
        Add Banner
      </Button>

      <BannerForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onBannerAdded={handleBannerAdded}
      />

      <UpdateBannerForm
        isOpen={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
        banner={selectedBanner}
        onBannerUpdated={handleBannerUpdated}
      />

      {banners.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div key={banner._id} className="relative mb-8">
              <img
                src={`${URL}${banner.path.replace(/\\/g, '/').replace(/\\/g, '/')}`}
                alt={banner.filename}
                className="w-full h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-gray-800 bg-opacity-50 transition-opacity">
                <div className="flex space-x-2">
                  <Button onClick={() => handleUpdate(banner)} className="bg-blue-500 text-white">
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(banner._id)} className="bg-red-500 text-white">
                    Delete
                  </Button>
                </div>
              </div>
              <div className="p-4 text-white bg-black bg-opacity-50">
                <h2 className="text-md lg:text-4xl font-bold">
                  {banner.title || 'No Title'}
                </h2>
                <p className="lg:text-base text-xs">
                  {banner.description || 'No Description'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No banners available</div>
      )}
    </div>
  );
};

export default MangeBanner;
