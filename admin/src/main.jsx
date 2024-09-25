import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Dashboard } from "./Pages/Dashboard.jsx";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Charts } from "./Pages/Charts";
import { LoginForm } from "./Pages/LoginForm";
import { SignUpForm } from "./Pages/SingUpFrom";
import { ProductHomePage } from "./Pages/Product/ProductHomePage";
import { AddProduct } from "./Pages/Product/AddProduct";
import { UpdateProduct } from "./Pages/Product/UpdateProduct";

import MangeCatogry from "./Pages/catogry/MangeCatogry";

import NavbarController from "./components/NavbarController";
import MangeBanner from "./Pages/banner/MangeBanner";
import Product from "./Pages/Product/Product";
import Order from "./Pages/Order";

import BookOrder from "./Pages/BookOrder";
import Testimonials from "./Pages/quote/Testimonials";
import QuotetionForm from "./Pages/QuotetionForm";
import BannerContent from "./Pages/contentManagment/BannerContent";
import { About } from "./components/contentManagment/About";
import PrivacyPolicy from "./components/contentManagment/PrivacyPolicy";
import Enquiry from "./components/Enquiry";
import { ProductDetailsById } from "./Pages/Product/ProductDetailsById";
import MangeSubCatogry from "./Pages/furniture/MangeSubCatogry";

// Create the router instance
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/manage-navbar",
        element: <NavbarController />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Mange-product",
        element: <ProductHomePage />,
      },
      {
        path: "/create-product",
        element: <AddProduct />,
      },
      {
        path: "/UpdateProduct",
        element: <UpdateProduct />,
      },
      {
        path: "/manage-category",
        element: <MangeCatogry />,
      },
      {
        path: "/manage-banner",
        element: <MangeBanner />,
      },
      {
        path: "/Product-Details",
        element: <Product />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order-book",
        element: <BookOrder />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/quotetionForm",
        element: <QuotetionForm />,
      },
      {
        path: "/bannerContent",
        element: <BannerContent />,
      },
      {
        path: "/aboutContent",
        element: <About />,
      },
   
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy/>,
      },
      {
        path: "/enquiry",
        element: <Enquiry/>,
      },
      {
        path: "/product/:productId",
        element: <ProductDetailsById />,
      },
      {
        path: "/furniture",
        element: <MangeSubCatogry/>,
      }
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>
);
