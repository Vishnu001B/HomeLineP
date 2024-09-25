import React, { useState, useEffect } from 'react';
import { FaHome, FaBriefcase, FaHotel, FaMapMarkerAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';

Modal.setAppElement('#root'); // Make sure this matches the root element of your app

const UpdateAddress = ({ address, fetchAddress }) => {
  const [addressType, setAddressType] = useState('Home');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  const URI = import.meta.env.VITE_API_URL;
  
  const addressId = address._id;

  useEffect(() => {
    if (address) {
      setAddressType(address.addressType || 'Home');
      setStreet(address.street || '');
      setCity(address.city || '');
      setState(address.state || '');
      setCountry(address.country || '');
      setPostalCode(address.postalCode || '');
      setName(address.name || '');
      setPhone(address.phone || '');
    }
  }, [address]);

  const handleAddressTypeClick = (type) => {
    setAddressType(type);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedAddress = { addressType, street, city, state, country, postalCode, name, phone };
    
    try {
      await axios.put(`${URI}api/user/address/${userId}/${addressId}`, updatedAddress); // Replace with your actual endpoint
      fetchAddress()
      setIsModalOpen(false);
      Swal.fire({
        title: 'Success!',
        text: 'Address updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error updating address:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the address',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="flex w-full items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600"
      >
        <FiEdit className="mr-2 " />
        <span className='lg:block md:block hidden'> Update Address</span>
      </button>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0  flex items-center justify-center z-50"
        overlayClassName="absolute inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Save address as *</label>
              <div className="flex space-x-2 mt-1">
                <button type="button" onClick={() => handleAddressTypeClick('Home')} className={`flex items-center px-3 py-2 border ${addressType === 'Home' ? 'bg-gray-300' : 'bg-white'} rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                  <FaHome className="mr-2" /> Home
                </button>
                <button type="button" onClick={() => handleAddressTypeClick('Work')} className={`flex items-center px-3 py-2 border ${addressType === 'Work' ? 'bg-gray-300' : 'bg-white'} rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                  <FaBriefcase className="mr-2" /> Work
                </button>
                <button type="button" onClick={() => handleAddressTypeClick('Hotel')} className={`flex items-center px-3 py-2 border ${addressType === 'Hotel' ? 'bg-gray-300' : 'bg-white'} rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                  <FaHotel className="mr-2" /> Hotel
                </button>
                <button type="button" onClick={() => handleAddressTypeClick('Other')} className={`flex items-center px-3 py-2 border ${addressType === 'Other' ? 'bg-gray-300' : 'bg-white'} rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                  <FaMapMarkerAlt className="mr-2" /> Other
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Street *</label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="block w-full border-2 solid border-black rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="block w-full border-2 solid border-black rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">State *</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="block w-full border-2 solid border-black rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="block w-full border-2 solid border-black rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="block w-full border-2 solid border-black rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm" required />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Enter your details for a seamless delivery experience</label>
              <input type="text" placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} className="block w-full rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm border-2 solid border-black" required />
              <input type="number" placeholder="Your phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full pl-5 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm mt-2 border-2 solid border-black" />
            </div>
            <div className='flex justify-evenly gap-5'>
              <button type="button" className="flex w-full items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600" onClick={() => setIsModalOpen(false)}>
                <FiEdit className="mr-2" /> Cancel
              </button>
              <button type="submit" className="flex w-full items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600">
                <FiEdit className="mr-2" /> Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateAddress;