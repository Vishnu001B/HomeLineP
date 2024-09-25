import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Enquiry = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const URI = import.meta.env.VITE_API_URL;

  const API_BASE_URL = `${URI}api/user/`;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, users, selectedStatus]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}book-nowdata`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch users",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSearch = () => {
    if (users && users.length > 0) {
      const search = searchTerm.toLowerCase();
      let filtered = users.filter(
        (user) =>
          (user.useName && user.useName.toLowerCase().includes(search)) ||
          (user.phoneNumber && user.phoneNumber.includes(search))
      );

      // Apply status filter
      if (selectedStatus !== "all") {
        filtered = filtered.filter((user) => user.status === selectedStatus);
      }

      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const payload = { status: newStatus };
      const response = await axios.put(
        `${API_BASE_URL}bookings/${userId}/status`,
        payload
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "User status updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchUsers(); // Refresh users
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update status",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Determine color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-red-500";
      case "Processing":
        return "text-yellow-500";
      case "confirm":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Enquiries</h1>

      {/* Tab Bar for Status */}
      <div className="flex justify-center mb-4">
        {["all", "pending", "Processing", "confirm"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`mx-2 px-4 py-2 rounded ${
              selectedStatus === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {status === "all"
              ? "All"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Product Details</th>
            <th className="py-2 px-4 border-b">Status</th>
            {/* Conditionally rendering the Action column header */}
            {users.some((user) => user.status !== "confirm") && (
              <th className="py-2 px-4 border-b">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b text-center">
                  {user.useName}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.phoneNumber}
                </td>
                <td className="py-2 px-4 border-b flex flex-col justify-center content-center items-center">
                 <div>
                 <img src={`${URI}uploads/${user.productImage}`} alt=""  className="w-32"/>
                 </div>
                  <div className=" flex flex-col justify-center content-center items-center">
                  <p className="truncate">{user.productName}</p>
                  <Link
                    to={`/product/${user.productId}`}
                    className="text-indigo-600"
                  >
                    View Product
                  </Link>
                  </div>
                </td>
                {/* Status with color */}
                <td
                  className={`py-2 px-4 border-b ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status}
                </td>

                {/* Dropdown for changing status */}
                {user.status !== "confirm" && (
                  <td className="py-2 px-4 border-b">
                    <select
                      value={user.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(user._id, e.target.value)
                      }
                      className="p-2 border rounded"
                    >
                      <option
                        value="pending"
                        disabled={user.status === "Processing"}
                      >
                        Pending
                      </option>
                      <option value="Processing">Processing</option>
                      <option value="confirm">Confirm</option>
                    </select>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Enquiry;
