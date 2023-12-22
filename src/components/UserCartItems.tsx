import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const UserCartItems: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  /*
  // Function to increase quantity
  const increaseQuantity = (index: any) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
  };

  // Function to decrease quantity
  const decreaseQuantity = (index: any) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  // Function to remove an item from the cart
  const removeCartItem = (index: any) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  */

  // Sample useEffect to fetch cart items (Replace with actual API call)
  useEffect(() => {
    fetchItems();
  }, []); // Empty dependency array to fetch items only once

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://localhost:8090/api/v1/cart/getCartItemsUserId",
        { headers }
      );

      console.log(response.data.data);

      // Set the retrieved products in the state
      setCartItems(response.data.data);
      //  alert(response.data.data.length);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.map((item: any, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{item.prductname}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
            </div>
            <div className="flex items-center">
              <button
                //onClick={() => decreaseQuantity(index)}
                className="px-3 py-1 bg-gray-200 text-gray-600 font-semibold rounded"
              >
                -
              </button>
              <p className="mx-4">{item.quantity}</p>
              <button
                //onClick={() => increaseQuantity(index)}
                className="px-3 py-1 bg-gray-200 text-gray-600 font-semibold rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-800 font-semibold">
              Total: ${item.price * item.quantity}
            </p>
            <button
              // onClick={() => removeCartItem(index)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      {cartItems.length === 0 && (
        <p className="text-xl text-center">Your cart is empty.</p>
      )}
      <Footer />
    </div>
  );
};

export default UserCartItems;
