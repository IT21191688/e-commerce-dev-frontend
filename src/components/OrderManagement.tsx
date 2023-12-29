import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
//import { useNavigate } from "react-router-dom";

const OrderManagement: React.FC = () => {
  //const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  // const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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
        "http://localhost:8090/api/v1/order/getAllOrders",
        { headers }
      );

      // Set the retrieved orders in the state
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      //console.log(orderId);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `http://localhost:8090/api/v1/order/deleteOrder/${orderId}`,
        { headers }
      );

      if ((response.data.isSuccessful = true)) {
        alert("Order Successfully Deleted");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleStatusChange = async (status: string, orderId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = {
        orderstatus: status,
      };
      const responnce = await axios.post(
        `http://localhost:8090/api/v1/order/updateOrder/${orderId}`,
        data,
        {
          headers,
        }
      );

      console.log(responnce);

      // fetchOrders();

      // window.location.reload();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders = orders.filter((order: any) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (orderId: string) => {
    setExpandedOrder((prevExpandedOrder: any) =>
      prevExpandedOrder === orderId ? null : orderId
    );
  };

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold">Order Management</h1>
        </div>
        <div
          className="container mx-auto mt-5"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-3"
          />
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order: any) => (
                <React.Fragment key={order._id}>
                  <tr
                    onClick={() => handleRowClick(order._id)}
                    className="cursor-pointer"
                  >
                    <td className="border px-4 py-2">{order._id}</td>
                    <td className="border px-4 py-2">
                      {" "}
                      {order.paymentid.transactionDetails.amount}
                    </td>
                    <td className="border px-4 py-2">{order.orderdate}</td>

                    <td className="border px-4 py-2">
                      {order.userid.firstname} {order.userid.lastname}
                    </td>
                    <td className="border px-4 py-2">{order.userid.email}</td>
                    <td className="border px-4 py-2">
                      {order.deliveryaddress}
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        value={order.orderstatus}
                        onChange={(e) => {
                          //setSelectedStatus(e.target.value);
                          handleStatusChange(e.target.value, order._id);
                        }}
                        className="form-select border-gray-300 rounded-md w-full p-2 mt-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(order._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order._id && (
                    <tr>
                      <td>
                        <div className="p-4 bg-gray-100">
                          <h2 className="text-lg font-semibold">
                            Order Items:
                          </h2>
                          <ul>
                            {order.products.map(
                              (product: any, index: number) => (
                                <li key={index}>
                                  {product.productid.productname} - Quantity:{" "}
                                  {product.quantity}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default OrderManagement;
