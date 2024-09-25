import React, { useEffect, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import axios from "axios";
import UpdateAddress from "./UpdateAddress";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addressActions } from "../../store/addressSlice";

const SaveAddress = () => {
  const [address, setAddress] = useState([]);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const URI = import.meta.env.VITE_API_URL;

  const fetchAddress = async () => {
    try {
      const resp = await axios.get(`${URI}api/address/${userId}`);
      setAddress(resp.data.addresses); // Ensure this matches the actual response structure
      dispatch(addressActions.updateAddress(resp.data.addresses));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`${URI}api/user/address/${userId}/${addressId}`);
      fetchAddress();
      Swal.fire({
        title: 'Success!',
        text: 'Address deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue deleting the address',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const confirmDelete = (addressId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this address?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(addressId);
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4 mt-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
      {address.length > 0 ? (
        address.map((addr, index) => (
          <div key={addr._id} className="flex gap-4 content-center">
            <span className="bg-blue-gray-200 py-1 px-2 text-sm h-8 rounded-sm text-blue-600">
              {index + 1}
            </span>
            <div className="flex justify-between w-full items-center content-center">
              <div>
                <div className="flex gap-2 items-center content-center">
                  <h1 className="font-semibold text-gray-600 text-base">
                    {addr.addressType} Address
                  </h1>
                  <IoCheckmarkDone className="text-blue-600 text-xl font-extrabold" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{addr.name}</p>
                  <p className="text-sm">{addr.street}</p>
                  <p className="text-sm">{addr.city}, {addr.state}, {addr.country}</p>
                  <p className="text-sm">{addr.postalCode}</p>
                  <p className="text-sm">Phone: {addr.phone}</p>
                </div>
              </div>
              <div className="lg:flex md:flex block content-center items-center gap-2">
                <UpdateAddress address={addr} fetchAddress={fetchAddress} />
                <div
                  className="flex gap-2 items-center my-4 justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                  onClick={() => confirmDelete(addr._id)}
                >
                  <MdDeleteOutline className="text-xl" />
                  <span className="lg:block md:block hidden">Delete Address</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="block justify-center items-center w-full">
          <p className="text-sm text-gray-600 text-center">No address available</p>
        </div>
      )}
      <div className="flex justify-center content-center items-center">
        <Link to="/addressForm" className="flex gap-2 text-xs items-center my-4 justify-center px-4 py-1 border border-transparent rounded-lg shadow-sm font-medium text-white bg-green-500 hover:bg-green-600">
          Add New Address
        </Link>
      </div>
    </div>
  );
};

export default SaveAddress;
