import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const UserCartItems: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [allTotal, setTotal] = useState(0);

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

      const total = calculateTotalPrice(response.data.data.cartItems);
      setTotal(total);

      setCartItems(response.data.data.cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items: any) => {
    let totalPrice = 0;

    // Iterate through each item and calculate subtotal
    items.forEach((item: any) => {
      totalPrice += item.productid.productprice * item.quantity;
    });

    return totalPrice;
  };

  const handleOrder = () => {
    navigate("/orderPage", { state: { cartItems } });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="container mx-auto px-4 py-8"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <h1 className="text-3xl font-bold mb-6">Items</h1>
        <h1 className="text-3xl font-bold mb-6 float-end">
          Total price:{allTotal}
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-xl text-center">Your cart is empty.</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.productid.productname}</td>
                  <td className="px-4 py-2">${item.productid.productprice}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="px-2 py-1 bg-gray-200 text-gray-600 font-semibold rounded"
                      >
                        -
                      </button>
                      <p className="mx-2">{item.quantity}</p>
                      <button
                        onClick={() => increaseQuantity(index)}
                        className="px-2 py-1 bg-gray-200 text-gray-600 font-semibold rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    ${item.productid.productprice * item.quantity}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removeCartItem(item._id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          onClick={handleOrder}
          className="px-4 py-2 float-end mt-5 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        >
          Process Order
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UserCartItems;
