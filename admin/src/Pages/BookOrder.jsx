import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const BookOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({}); // Track which orders are expanded
  const navigate = useNavigate()

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    filterOrdersByStatus();
  }, [activeTab, orders, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredOrders]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${URI}api/productOrder/`);
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterOrdersByStatus = () => {
    let filtered = orders;

    if (activeTab !== "all") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.phone.includes(searchTerm) ||
        order.products.some(product =>
          product.productName && product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
  };

  const handleOnclick = async (orderId, status, userId) => {
    if (status === "pending") {
      updateOrderStatus(orderId, "processing");
    } else if (status === "processing") {
      updateOrderStatus(orderId, "shipped");
    } else if (status === "shipped") {
      delivered(orderId, userId);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(`${URI}api/productOrder/changeOrderStatus`, {
        orderId,
        status,
      });
      fetchOrder();
      Swal("Success", `Order status updated to ${status}`, "success");
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal("Error", "Failed to update order status", "error");
    }
  };

  const delivered = async (orderId, userId) => {
    try {
      await axios.put(`${URI}api/productOrder/sendOpt/${userId}`);
      Swal("Order Delivered", "An OTP has been sent to the user", "success");
      setCurrentOrderId(orderId);
      setCurrentUserId(userId);
      setOtpModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      Swal("Error", "Failed to send OTP", "error");
    }
  };

  const verifyOrder = async () => {
    try {
      await axios.put(`${URI}api/productOrder/vefifyOrder`, {
        orderId: currentOrderId,
        otp,
      });
      Swal("Order Verified", "The order has been successfully verified", "success");
      setOtpModalOpen(false);
      fetchOrder();
    } catch (error) {
      console.error("Error:", error);
      Swal("Error", "Failed to verify the order", "error");
    }
  };

  const cancelOrder = async (orderId) => {
    Swal({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        try {
          await axios.put(`${URI}api/productOrder/cancelOrder/${orderId}`);
          Swal("Order Cancelled", "The order has been successfully cancelled", "success");
          fetchOrder();
        } catch (error) {
          console.error("Error:", error);
          Swal("Error", "Failed to cancel the order", "error");
        }
      }
    });
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

 

  return (
    <div className="container overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email, phone number, or product name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex space-x-4 mb-6">
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`py-2 px-4 rounded-md ${
              activeTab === status
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <p className="text-sm text-green-600 mb-4">
        {activeTab === "all" ? "List of All Orders" : `List of ${activeTab} Orders`}
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white text-black shadow-md rounded-lg">
          <thead>
            <tr className="text-left bg-gray-800 text-white">
              <th className="py-2 px-4">Customer Info</th>
              <th className="py-2 px-4">Shipping Information</th>
              <th className="py-2 px-4">Product Details</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border bg-gray-500 text-white">
                  <td className="py-2 px-4 text-center">
                    <p>Order Date <br />{new Date(order.createdAt).toLocaleString()}</p>
                    <p>{order.user.email}</p>
                    <p>{order.address.phone}</p>
                  </td>
                  <td className="py-2 px-4">
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}</p>
                    <p>{order.address.country}, {order.address.postalCode}</p>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => toggleOrderExpand(order._id)}
                      className="bg-blue-500 text-white rounded px-2 py-1"
                    >
                      {expandedOrders[order._id] ? "Show Less" : "Show Products"}
                    </button>
                    {expandedOrders[order._id] && (
                      <div className="mt-2">
                        {order.products.map((product) => (
                          <div key={product.productId} className="border rounded-sm p-2 my-2 flex flex-col items-center content-center">
                            <img
                              src={`${URI}uploads/${product.image}`}
                              alt="Product"
                              className="w-full h-40 rounded-sm"
                            />
                            <p className="font-semibold">{product.productName}</p>
                            <p>Product ID: {product.productId}</p>
                            <div className="grid grid-cols-2 gap-2">
                              <p>Quantity: {product.quantity}</p>
                              <p>Price: {product.price}</p>
                              <p>Size: {product.attributes.size.join(", ")}</p>
                              <p>Color: {product.attributes.color.join(", ")}</p>
                             
                            </div>
                            <Link to={`/product/${product.productId}`} className="p-3 m-2 border hover:bg-blue-500 hover:border-none " >View Product Details</Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 flex justify-center items-center gap-4 flex-wrap">
                    <button
                      onClick={() => handleOnclick(order._id, order.status, order.user._id)}
                      className={`py-1 px-2 rounded ${
                        order.status === "delivered"
                          ? "bg-green-500 text-white"
                          : order.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </button>
                    {order.status !== "delivered" && order.status !== "cancelled" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="ml-2 py-1 px-2 bg-red-500 text-white rounded"
                      >
                        Cancel Order
                      </button>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal isOpen={otpModalOpen} onRequestClose={() => setOtpModalOpen(false)}>
        <h2>Enter OTP to Verify Order</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={verifyOrder} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Verify
        </button>
        <button
          onClick={() => setOtpModalOpen(false)}
          className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default BookOrder;
