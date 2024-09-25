import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import OtpVerification from "../components/OtpVerification";

const Register = ({ toggleForm, setIsLoginModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const URI = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${URI}api/user/register`, {
        ...formData,
      });
      if (resp.status === 200) {
        Swal.fire("Success", "OTP sent successfully", "success");
        setOtpSent(true);
        localStorage.setItem("emailId", formData.email);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire("Error", "Registration failed. Please try again.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {otpSent ? (
          <OtpVerification
            mobileNumber={formData.phone}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-6 w-full"
              >
                Register
              </button>
            </form>

            <div className="flex justify-between mt-4 text-sm text-blue-500">
              <span className="cursor-pointer" onClick={toggleForm}>
                Already have an account? Login
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
