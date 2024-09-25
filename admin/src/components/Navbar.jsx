import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart,
  Edit,
} from "lucide-react";

const Navbar = () => {
  const [showManageProductOptions, setShowManageProductOptions] =
    useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);

  const [showServiceManagmentOptions, setShowServiceManagmentOptions] =
    useState(false);

  const [showVendorManagmentOptions, setShowVendorManagmentOptions] =
    useState(false);


    const [showContentManagmentOptions , setShowContentManagmentOptions] = useState(false);
  const toggleOptions = () => {
    setShowManageProductOptions(!showManageProductOptions);
  };

  const toggleReportOptions = () => {
    setShowReportOptions(!showReportOptions);
  };

  const togalServiceManagmentOptions = () => {
    setShowServiceManagmentOptions(!showServiceManagmentOptions);
  };

  const togalVendorManagmentOptions = () => {
    setShowVendorManagmentOptions(!showVendorManagmentOptions);
  };
  const toggleContentManagmentOptions = () => {
    setShowContentManagmentOptions(!showContentManagmentOptions);
  };

  return (
    <div className="w-[300px] bg-[#fffce8] rounded-xl py-4 border-2  ">
      <nav className="grid gap-6 text-lg font-medium px-2 pt-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>

        {/* Manage Product Options */}
        <div>
          <button
            onClick={toggleOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <Package className="h-5 w-5" />
            Product Management
          </button>
          {showManageProductOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link
                to="/manage-navbar"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Manage Navbar
              </Link>
              <Link
                to="/create-product"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Create Product
              </Link>
              <Link
                to="/Mange-product"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Product
              </Link>
              <Link
                to="/manage-category"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Category
              </Link>
              <Link
                to="/furniture"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Furniture
              </Link>

              {/* <Link
                to="/manage-banner"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Manage Banner
              </Link> */}

              {/* <Link
                to="/testimonials"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
              Testimonials
              </Link> */}
            </div>
          )}
        </div>

        {/* Service Managment  Options */}
        <div>
          <button
            onClick={togalServiceManagmentOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <Package className="h-5 w-5" />
            Service Managment
          </button>
          {showServiceManagmentOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Technical
              </Link>
              <Link
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
              Worker
              </Link>
             
            </div>
          )}
        </div>
        {/* Manage Report Options */}
        <div>
          <button
            onClick={toggleReportOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <Package className="h-5 w-5" />
            Report Managment
          </button>
          {showReportOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link
                to="/order"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Order
              </Link>
              <Link
                to="/order-book"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                book order
              </Link>
              <Link
                to="/enquiry"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Enquiry
              </Link>
              <Link
                to="/quotetionForm"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Quote
              </Link>

              <Link
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Voucher
              </Link>
            </div>
          )}
        </div>

        {/* Vendor Managment  Options */}
        <div>
          <button
            onClick={togalVendorManagmentOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <Package className="h-5 w-5" />
            Stock Managment
          </button>
          {showVendorManagmentOptions && (
            <div className="ml-8 mt-2 space-y-2">
              <Link
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Vendor Details
              </Link>
              <Link
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
              Stocks Details
              </Link>
            
             
            </div>
          )}
        </div>
  {/* content Managment  Options */}
        <div>
          <button
            onClick={toggleContentManagmentOptions}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <Package className="h-5 w-5" />
            Content Managment
          </button>
          {showContentManagmentOptions && (
            <div className="ml-8 mt-2 space-y-2">
              {/* <Link
                to="/bannerContent"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Banner Content
              </Link> */}
              <Link
                to="/aboutContent"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                About Us
              </Link>
              <Link
                to="/PrivacyPolicy"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Privacy policy
              </Link>
              <Link
                to="/testimonials"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
              Testimonials
              </Link>
              {/* <Link
                to="/manage-category"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Subcategory
              </Link> */}

              <Link
                to="/manage-banner"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-5 w-5" />
                Manage Banner
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/settings"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <BarChart className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
