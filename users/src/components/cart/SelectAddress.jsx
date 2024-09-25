import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomizedSteppers from '../CustomizedSteppers';
import Swal from 'sweetalert2'; // Import SweetAlert

const SelectAddress = () => {
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAddress();
    }, []);

    const URI = import.meta.env.VITE_API_URL;

    const fetchAddress = async () => {
        try {
            const resp = await axios.get(`${URI}api/address/${userId}`);
            setAddress(resp.data.addresses);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectAddress = (addr) => {
        setSelectedAddress(addr._id);
        localStorage.setItem('selectedAddress', JSON.stringify(addr)); // Save selected address
    };

    const proceedToPayment = () => {
        if (selectedAddress) {
            
              
                    navigate('/payment'); // Navigate to payment page
                
          
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'No Address Selected',
                text: 'Please select an address first!',
            });
        }
    };

    return (
        <div>
            <div className='pt-40'>
                <CustomizedSteppers />
            </div>
            <div className="p-4 lg:px-[14%]">
                <div className="w-full flex flex-col gap-4 p-4 mt-4 md:mt-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {address.length > 0 ? (
                        address.map((addr, index) => (
                            <div
                                key={addr._id}
                                className={`flex flex-col md:flex-row gap-4 p-4 border rounded-md ${selectedAddress === addr._id ? 'border-green-500' : 'border-gray-300'
                                    }`}
                            >
                                <span className="bg-blue-gray-200 py-1 px-2 text-sm h-8 rounded-sm text-blue-600 w-10 text-center">
                                    {index + 1}
                                </span>
                                <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-base md:text-lg font-semibold">{addr.name}</p>
                                        <p className="text-sm md:text-base">{addr.street}</p>
                                        <p className="text-sm md:text-base">
                                            {addr.city}, {addr.state}, {addr.country}
                                        </p>
                                        <p className="text-sm md:text-base">{addr.postalCode}</p>
                                        <p className="text-sm md:text-base">Phone: {addr.phone}</p>
                                    </div>
                                    <button
                                        onClick={() => handleSelectAddress(addr)}
                                        className={`mt-4 md:mt-0 px-4 py-2 border rounded-lg text-white ${selectedAddress === addr._id ? 'bg-green-500' : 'bg-blue-500'
                                            }`}
                                    >
                                        {selectedAddress === addr._id ? 'Selected' : 'Select'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="block justify-center items-center w-full">
                            <p className="text-sm text-gray-600 text-center">No address available</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center gap-5 items-center'>
                <div className="flex justify-center content-center items-center mt-4">
                    <Link
                        to="/addressForm"
                        className="flex gap-2 text-xs items-center my-4 justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-green-500 hover:bg-green-600"
                    >
                        Add New Address
                    </Link>
                </div>
                <div className="flex justify-center content-center items-center mt-4">
                    <button
                        onClick={proceedToPayment}
                        className="flex gap-2 text-xs items-center my-4 justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectAddress;
