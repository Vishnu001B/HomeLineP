import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import CategoryDetails from "./components/category/CategoryDetails";
import ProductDetails from "./components/productDetrils/ProductDetails";
import Login from "./routes/Login";
import Register from "./routes/Register";
import OtpVerification from "./components/OtpVerification";
import { Provider } from "react-redux";
import homeLine from "./store/index";
import CheckoutForm from "./components/CheckoutForm";
import ViewCartAndUpdateCart from "./components/cart/ViewCartAndUpdateCart";
import VerticalGarden from "./components/verticalGarden/VerticalGarden";
import AboutUs from "./components/about/AboutUs";
import ContactUs from "./components/about/ContactUs";

import ScrollToTop from "./components/ScrollToTop"; // Import the new ScrollToTop component
import Subcategory from "./components/category/Subcategory";
import UserProfile from "./components/UserProfile/UserProfile";
import AddressForm from "./components/UserProfile/AddressForm";
import SelectAddress from "./components/cart/SelectAddress";
import PaymentHomePage from "./components/payment/PaymentHomepage"
import OrderDetails from "./components/UserProfile/OrderDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/category/:name/shop-in-bangalore",
        element: <CategoryDetails />,
      },
      {
        path: "/subcategory/:name/shop-in-bangalore",
        element: <Subcategory />,
      },
      {
        path: "/productDetails/shop-in-bangalore",
        element: <ProductDetails />,
      },
      {
        path: "*",
        element: <h1>Page Not Found</h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verifyOtp",
        element: <OtpVerification />,
      },
      {
        path: "/CheckoutForm",
        element: <SelectAddress />,
      },
      {
        path: "/viewCartDeatils",
        element: <ViewCartAndUpdateCart />,
      },
      {
        path: "/verticalGarden/:name",
        element: <VerticalGarden />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/user-Profile/:name",
        element: <UserProfile />,
      },
      {
        path: "/addressForm",
        element: <AddressForm />,
      },{
        path: "/payment",
        element: <PaymentHomePage />,
      },{
        path:"/orderDetails/:id",
        element: <OrderDetails/>// Add the component for order details when the path is "/orderDetails/:id"
      }
     
     
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={homeLine}>
      <RouterProvider router={router}>
        <ScrollToTop /> {/* Add the ScrollToTop component here */}
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
