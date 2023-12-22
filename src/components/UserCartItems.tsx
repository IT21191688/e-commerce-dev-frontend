import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const UserCartItems: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Function to increase quantity
  const increaseQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
  };

  // Function to decrease quantity
  const decreaseQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
    }
  };

  const removeCartItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `http://localhost:8090/api/v1/cart/removeCartItem/${itemId}`,
        { headers }
      );

      if (response.data.isSuccessful === true) {
        alert("Cart Item Remove Successfully!");
        fetchItems();
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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

      console.log(response.data);

      // Set the retrieved products in the state
      setCartItems(response.data.data.cartItems);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div>
      <div
        className="container mx-auto px-4 py-8"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.map((item: any, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {item.productid.productname}
                </h2>
                <p className="text-gray-600">
                  Price: ${item.productid.productprice}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => decreaseQuantity(index)}
                  className="px-3 py-1 bg-gray-200 text-gray-600 font-semibold rounded"
                >
                  -
                </button>
                <p className="mx-4">{item.quantity}</p>
                <button
                  onClick={() => increaseQuantity(index)}
                  className="px-3 py-1 bg-gray-200 text-gray-600 font-semibold rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-800 font-semibold">
                Total: ${item.productid.productprice * item.quantity}
              </p>
              <button
                onClick={() => removeCartItem(item._id)}
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
      </div>
      <Footer />
    </div>
  );
};

export default UserCartItems;
