import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const UserCartItems: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const increaseQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
  };

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
        alert("Cart Item Removed Successfully!");
        fetchItems();
      }
    } catch (error) {
      console.error("Error removing product:", error);
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

      setCartItems(response.data.data.cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleOrder = () => {
    navigate("/orderPage", { state: { cartItems } });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
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
              <div className="flex space-x-4">
                <button
                  onClick={() => removeCartItem(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {cartItems.length === 0 && (
          <p className="text-xl text-center">Your cart is empty.</p>
        )}

        <button
          onClick={handleOrder}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Order
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UserCartItems;
