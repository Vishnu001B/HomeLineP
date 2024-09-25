// src/components/Navbar.js
import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import footer from '../assets/image/logo-footer.png';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../routes/Login';
import MiniDrawer from './MiniDrawer'; 
import Drawer from "./module/Drawer";// Import the MiniDrawer component
import { FaUserCircle } from 'react-icons/fa';
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the mini drawer
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const email = localStorage.getItem('email');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    
    navigate('/');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-[#faf3dd] p-4 lg:p-8  w-full flex items-center justify-between gap-5 lg:px-32 fixed z-50 h-20">
       

        <Link to="/" className="lg:text-2xl md:text-xl text-sm font-bold w-1/5">
          <img src={footer} alt="Logo" className="w-14 h-16 mr-2" />
        </Link>

        <div className="relative lg:w-1/2 w-full flex items-center">
          <SearchIcon className="absolute left-3 text-gray-500" />
          <input
            type="search"
            placeholder="Search the product"
            className="border-gray-600 border-2 rounded-full p-2 pl-10 w-full bg-white"
          />
        </div>

        <div className="hidden items-center space-x-4 w-1/4 justify-end  sm:flex">
        <div className="flex items-center space-x-2 cursor-pointer">
            <Drawer/>
          </div>
          <div className="relative flex items-center space-x-2 cursor-pointer">
            {localStorage.getItem('token') ? (
             <div className="relative">
             <button
               className="flex items-center bg-transparent border-none text-black text-sm md:text-base"
               onClick={toggleDropdown}
             >
               <FaUserCircle className="ml-1 mr-2 text-2xl" /> Account
             </button>
             {isDropdownOpen && (
               <div className="absolute bg-white text-gray-600 shadow-md rounded w-60 mt-4 p-5 z-10">
                 <Link
                   to={`/user-Profile/MyAcount`}
                   className="block px-4 py-2 hover:bg-gray-200 text-lg font-semibold"
                 >
                   My Account
                   <p className="text-sm font-thin">
                     {email}
                   </p>
                 </Link>
                 <Link
                   to={`/user-Profile/MyOrder`}
                   className="block px-4 py-2 hover:bg-gray-200"
                 >
                   My Orders
                 </Link>
                 <Link
                   to={`/user-Profile/SaveAddress`}
                   className="block px-4 py-2 hover:bg-gray-200"
                 >
                   Save Address
                 </Link>
                 <Link
                   to={`/user-Profile/MyWishlist`}
                   className="px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                 >
                   <span>My Wishlist</span>
                   <span className="text-sm font-thin">
                     ₹ 50
                   </span>
                 </Link>
                 <div className="border-t my-2"></div>
                 <Link
                   to="/faqs"
                   className="block px-4 py-2 hover:bg-gray-200"
                 >
                   FAQ's
                 </Link>
                 <Link
                   to="/account-privacy"
                   className="block px-4 py-2 hover:bg-gray-200"
                 >
                   Account Privacy
                 </Link>
                 <button
                   className="block px-4 py-2 hover:bg-gray-200 text-red-500"
                   onClick={handleLogout}
                 >
                   Logout
                 </button>
               </div>
             )}
           </div>
            ) : (
              <div  onClick={toggleLoginModal} className='flex justify-center items-center content-center gap-2'>
                <button
                className="flex items-center bg-transparent border-none text-black text-sm md:text-base"
                onClick={() => {
                  navigate("/My-Account");
                }}
              >
                LOGIN <ArrowForwardOutlinedIcon className="ml-1" />
              </button>
              </div>
            )}
            
          </div>

        </div>

        <div className="flex sm:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <CloseIcon className="text-3xl" />
            ) : (
              <MenuIcon className="text-3xl"   onClick={toggleDrawer}/>
            )}
          </button>
        </div>
      </nav>
      
      <MiniDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <div className="relative bg-white p-0 h-[80vh] sm:h-[500px] rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-0">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleLoginModal}
            >
              <CloseIcon className="text-3xl" />
            </button>
            <div className="overflow-auto">
              <Login setIsLoginModalOpen={setIsLoginModalOpen} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
