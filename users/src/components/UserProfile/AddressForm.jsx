import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { FaHome, FaBriefcase, FaHotel, FaMapMarkerAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const libraries = ['places'];
const mapContainerStyle = {
  flex: 1,
  height: '400px',
};
const longitude = localStorage.getItem('longitude');
const latitude = localStorage.getItem('latitude');

const center = {
  lat: parseFloat(latitude),
  lng: parseFloat(longitude),
};

const AddressForm = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your Google Maps API key
    libraries,
  });
  const navigate = useNavigate();
  
  
  const [markers, setMarkers] = useState([]);
  const [addressType, setAddressType] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const URI = import.meta.env.VITE_API_URL;

  const userId = localStorage.getItem('userId');

  const onMapClick = useCallback((event) => {
    setMarkers([{
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    }]);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const handleAddressTypeClick = (type) => {
    setAddressType(type);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const addressData = {
      street,
      city,
      state,
      country,
      postalCode,
      name,
      phone,
      addressType,
      location: markers[0] ? { lat: markers[0].lat, lng: markers[0].lng } : null,
    };
    console.log(addressData);
    try {
      const response = await axios.post(`${URI}api/address/${userId}`, addressData);
      if (response.status === 201) {
        navigate(-1);
      } else {
        console.error('Failed to save address');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-1 max-w-4xl mx-auto lg:flex md:flex block gap-10 px-10 pt-40">
      <div className="lg:w-1/2 md:w-1/2 w-full my-8">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          onClick={onMapClick}
        >
          {markers.map((marker) => (
            <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </div>
      <div className="lg:w-1/2 md:w-1/2 w-full my-4">
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
          <button type="submit" className="flex w-full items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600">
            <FiEdit className="mr-2" /> Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;