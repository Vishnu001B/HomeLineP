import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Register from "./Register";


const Login = ({ setIsLoginModalOpen }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginWithOTP, setLoginWithOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const URI = import.meta.env.VITE_API_URL;

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const toggleLoginMethod = () => {
    setLoginWithOTP(!loginWithOTP);
  };

  const handleLoginWithPassword = async () => {
    try {
      const response = await axios.post(`${URI}api/user/login`, {
        email: usernameOrEmail,
        password: password,
      });

    
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("email", response.data.user.email);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        });

        setIsLoginModalOpen(false);
  
    } catch (error) {
      console.error("Login failed", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred during login. Please try again.",
      });
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("/api/send-otp", {
        phoneNumber,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "OTP sent successfully. Please check your phone.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Send OTP",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Failed to send OTP", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send OTP",
        text: "An error occurred while sending OTP. Please try again.",
      });
    }
  };

  const handleLoginWithOtp = async () => {
    try {
      const response = await axios.post("/api/verify-otp", {
        phoneNumber,
        otp,
      });

     
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
        });

        // Close the login modal
        setIsLoginModalOpen(false);
      
    } catch (error) {
      console.error("OTP verification failed", error);
      Swal.fire({
        icon: "error",
        title: "OTP Verification Failed",
        text: "An error occurred during OTP verification. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {isRegister ? (
          <Register
            toggleForm={toggleForm}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="flex justify-center mb-4">
              <button
                className={`${
                  loginWithOTP
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded-md hover:bg-blue-600 mr-2`}
                onClick={toggleLoginMethod}
              >
                Login with OTP
              </button>
              <button
                className={`${
                  !loginWithOTP
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded-md hover:bg-blue-600`}
                onClick={toggleLoginMethod}
              >
                Login with Password
              </button>
            </div>
            {loginWithOTP ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">
                      <AccountCircleIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="ml-2 w-full focus:outline-none"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                </div>
                <div className="space-y-4 mt-4">
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">
                      <AccountCircleIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="ml-2 w-full focus:outline-none"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                    onClick={handleLoginWithOtp}
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">
                      <AccountCircleIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="Username or Email"
                      className="ml-2 w-full focus:outline-none"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">
                      <LockOpenIcon />
                    </span>
                    <input
                      type="password"
                      placeholder="***********"
                      className="ml-2 w-full focus:outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Remember me</span>
                  </div>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={handleLoginWithPassword}
                  >
                    Login
                  </button>
                </div>
              </>
            )}

            <div className="flex justify-between mt-4 text-sm text-blue-500">
              <a href="#">Forgot Password?</a>
              <span className="cursor-pointer" onClick={toggleForm}>
                Create an Account
              </span>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="flex items-center justify-center w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-md hover:bg-blue-100 mr-2">
                <FacebookIcon className="mr-2" />
                Facebook
              </button>
              <button className="flex items-center justify-center w-full border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-100">
                <GoogleIcon className="mr-2" />
                Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
