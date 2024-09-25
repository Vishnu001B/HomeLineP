import { createSlice } from '@reduxjs/toolkit';

const bagSlice = createSlice({
  name: 'bag',
  initialState: {
    data: [],
    totalQuantity: 0,
  },
  reducers: {
    addToBag: (state, action) => {
      const newProduct = action.payload.data;
      const existingProductIndex = state.data.findIndex(
        (item) => item._id === newProduct._id
      );

      if (existingProductIndex !== -1) {
        // Product already exists, increase its quantity
        state.data[existingProductIndex].quantity += 1;
      } else {
        // Product does not exist, add new entry with quantity 1
        state.data.push({ ...newProduct, quantity: 1 });
      }

      // Update the total quantity in the bag
      state.totalQuantity += 1;
    },
    
    removeFromBag: (state, action) => {
      const productIdToRemove = action.payload.productId;
      const existingProductIndex = state.data.findIndex(
        (item) => item._id === productIdToRemove
      );

      if (existingProductIndex !== -1) {
        // Subtract the quantity of the product being removed from the total
        state.totalQuantity -= state.data[existingProductIndex].quantity;

        // Remove the product from the bag
        state.data.splice(existingProductIndex, 1);
      }
    },
    
    clearBag: (state) => {
      state.data = [];
      state.totalQuantity = 0;
    },

    increaseQuantity: (state, action) => {
      const productIdToIncrease = action.payload._id ;
      const existingProductIndex = state.data.findIndex(
        (item) => item._id  === productIdToIncrease
      );

      if (existingProductIndex !== -1) {
        state.data[existingProductIndex].quantity += 1;
        state.totalQuantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const productIdToDecrease = action.payload._id ;
      const existingProductIndex = state.data.findIndex(
        (item) => item._id  === productIdToDecrease
      );

      if (existingProductIndex !== -1) {
        if (state.data[existingProductIndex].quantity > 1) {
          state.data[existingProductIndex].quantity -= 1;
          state.totalQuantity -= 1;
        } else {
          // If quantity is 1, remove the product from the bag
          state.data.splice(existingProductIndex, 1);
          state.totalQuantity -= 1;
        }
      }
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;
