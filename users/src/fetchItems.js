import axios from "axios";
import { bagActions } from "./store/bagSlice";

export const fetchItems = async (dispatch) => {
  const URI = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem('userId');

  try {
    const resp = await axios.get(`${URI}api/user/getCartByUserId/${userId}`);
    const fetchedItems = resp.data;
    console.log("Fetched items", fetchedItems);
    
    fetchedItems.forEach(item => {
      const productData = {
        product: {
          _id: item._id,
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          image: item.image,
          discount: item.discount || 0,
          attributes: item.attributes || {},
        },
        quantity: item.quantity || 1
      };

      // Dispatching the action with the fetched data
      dispatch(bagActions.addToBag({
        data: productData.product,
        quantity: productData.quantity
      }));
    });
  } catch (error) {
    console.error("Error fetching items", error);
  }
};
