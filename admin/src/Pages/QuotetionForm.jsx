import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const QuotetionForm = () => {
    const URI = import.meta.env.VITE_API_URL;
  // State for form fields
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState([{ product: '', quantity: 1, price: 0 }]);
  const [servicePrice, setServicePrice] = useState(0);
  const [settlementPrice, setSettlementPrice] = useState(0);
  const [quotetions, setQuotetions] = useState([]);
  const [editingQuotation, setEditingQuotation] = useState(null);

  // Handle adding a new product field
  const addProductField = () => {
    setOrderDetails([...orderDetails, { product: '', quantity: 1, price: 0 }]);
  };

  // Handle change in product details
  const handleOrderDetailsChange = (index, field, value) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index][field] = value;
    setOrderDetails(updatedOrderDetails);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      orderNumber,
      orderDetails,
      servicePrice,
      settlementPrice,
    };

    try {
      if (editingQuotation) {
        await axios.put(`${URI}api/quotetion/${editingQuotation.orderNumber}`, data);
        alert('Quotation updated successfully!');
      } else {
        await axios.post(`${URI}api/quotetion`, data);
        alert('Quotation created successfully!');
      }
      fetchQuotetions(); // Fetch updated list after submission
      resetForm();
    } catch (error) {
      console.error('Error submitting quotation:', error);
      alert('Failed to submit quotation.');
    }
  };

  // Handle editing a quotation
  const handleEdit = (quotation) => {
    setOrderNumber(quotation.orderNumber);
    setOrderDetails(quotation.orderDetails);
    setServicePrice(quotation.servicePrice);
    setSettlementPrice(quotation.settlementPrice);
    setEditingQuotation(quotation);
  };

  // Handle deleting a quotation
  const handleDelete = async (orderNumber) => {
    try {
      await axios.delete(`${URI}api/quotetion/${orderNumber}`);
      alert('Quotation deleted successfully!');
      fetchQuotetions(); // Fetch updated list after deletion
    } catch (error) {
      console.error('Error deleting quotation:', error);
      alert('Failed to delete quotation.');
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setOrderNumber('');
    setOrderDetails([{ product: '', quantity: 1, price: 0 }]);
    setServicePrice(0);
    setSettlementPrice(0);
    setEditingQuotation(null);
  };

  // Fetch the list of quotations
  const fetchQuotetions = async () => {
    try {
      const response = await axios.get(`${URI}api/quotetions`);
      setQuotetions(response.data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    }
  };

  // Fetch the quotations when the component loads
  useEffect(() => {
    fetchQuotetions();
  }, []);

  return (
    <>
      <div className="bg-blue-300 min-h-screen py-10 px-5 w-full">
        <div className="container mx-auto bg-white shadow-lg p-8 rounded-md">
          <h1 className="text-3xl font-bold text-black mb-6">{editingQuotation ? 'Edit Quotation' : 'Create Quotation'}</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-2">Order Number:</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <h3 className="text-xl font-semibold text-black mb-4">Order Details</h3>
            {orderDetails.map((detail, index) => (
              <div key={index} className="mb-4 bg-gray-100 p-4 rounded-md">
                <div className="mb-2">
                  <label className="block text-black mb-1">Product:</label>
                  <input
                    type="text"
                    value={detail.product}
                    onChange={(e) => handleOrderDetailsChange(index, 'product', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-black mb-1">Quantity:</label>
                  <input
                    type="number"
                    value={detail.quantity}
                    onChange={(e) => handleOrderDetailsChange(index, 'quantity', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-black mb-1">Price:</label>
                  <input
                    type="number"
                    value={detail.price}
                    onChange={(e) => handleOrderDetailsChange(index, 'price', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProductField}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600"
            >
              Add Another Product
            </button>

            <div className="mb-4">
              <label className="block text-black font-semibold mb-2">Service Price:</label>
              <input
                type="number"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-black font-semibold mb-2">Settlement Price:</label>
              <input
                type="number"
                value={settlementPrice}
                onChange={(e) => setSettlementPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
            >
              {editingQuotation ? 'Update Quotation' : 'Create Quotation'}
            </button>

            {editingQuotation && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white py-2 px-6 rounded-md ml-4 hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="container mx-auto mt-10">
          <h2 className="text-2xl font-bold text-black mb-4">Quotations List</h2>
          {quotetions.length === 0 ? (
            <p className="text-black">No quotations available.</p>
          ) : (
            <ul className="space-y-4">
              {quotetions.map((quotation) => (
                <li key={quotation._id} className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-black">Quotation #{quotation.orderNumber}</h3>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(quotation)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(quotation.orderNumber)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p><strong className="text-black">Service Price:</strong> {quotation.servicePrice}</p>
                  <p><strong className="text-black">Settlement Price:</strong> {quotation.settlementPrice}</p>
                  <div>
                    <strong className="text-black">Order Details:</strong>
                    <ul className="mt-2 ml-4 list-disc">
                      {quotation.orderDetails.map((detail, index) => (
                        <li key={index}>
                          {detail.product} - Quantity: {detail.quantity}, Price: {detail.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default QuotetionForm;
