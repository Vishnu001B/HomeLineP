import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addressActions } from "./store/addressSlice";
import { bagActions } from "./store/bagSlice";
import { UserActions } from "./store/userInfoSlice";

export const Api = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const URI = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
      try {
        // Dispatch action to indicate fetch is in progress
        dispatch({ type: 'FETCH_STATUS_LOADING' });

        await fetchAddress(signal);
        await fetchItems(signal);
        await fetchUserDetails(signal);

        // Dispatch action to indicate fetch is successful
        dispatch({ type: 'FETCH_STATUS_SUCCESS' });

      } catch (error) {
        console.error("Error in fetchData", error);

        // Dispatch action to indicate an error occurred
        dispatch({ type: 'FETCH_STATUS_ERROR', error: error.message });
      }
    };

    fetchData();

    // Cleanup function to abort fetches on unmount
    return () => controller.abort();
  }, [dispatch, userId, URI]);

  const fetchAddress = async (signal) => {
    try {
      const resp = await axios.get(`${URI}api/address/${userId}`, { signal });
      // console.log("fetchAddress",resp.data.address);
      dispatch(addressActions.updateAddress(resp.data.address));
    } catch (error) {
      console.error("Error fetching address", error);
    }
  };

  const fetchItems = async (signal) => {
    try {
      const resp = await axios.get(`${URI}api/user/getCartByUserId/${userId}`, { signal });
  
      // Assuming `resp.data` is the array of product objects as you provided
      const fetchedItems = resp.data;
      console.log("Fetched items",resp.data);
  
      // Loop over the fetched items and dispatch them to the Redux store
      fetchedItems.forEach(item => {
        const productData = {
          product: {
            _id: item._id,  // Product ID (_id from fetched data)
            productId: item.productId,  // Unique product ID
            productName: item.productName,
            price: item.price,
            image: item.image,  // Correct image field
            discount: item.discount || 0,  // Include discount if provided
            attributes: item.attributes || {},  // Default to an empty object if not provided
          },
          quantity: item.quantity || 1  // Set the quantity, default to 1 if not provided
        };
  
        // Dispatch to Redux with correct structure
        dispatch(bagActions.addToBag({
          data: productData.product, // Pass the product inside `data`
          quantity: productData.quantity // Pass the quantity separately
        }));
      });
  
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };
  
  

  const fetchUserDetails = async (signal) => {
    try {
      const resp = await axios.get(`${URI}api/user/getUser/${userId}`, { signal });
      dispatch(UserActions.updateUser(resp.data.userDetails));
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  return <div></div>; 
};
