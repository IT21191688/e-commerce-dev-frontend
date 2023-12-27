import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";

const UserProfile: React.FC = () => {
  // const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");

  const [orders, setOrders] = useState([]);
  //const [userId, setUserId] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleOrderClick = (order: any) => {
    setSelectedOrder((prevSelectedOrder: any) => {
      if (prevSelectedOrder?._id === order._id) {
        return null; // Deselect the order if it's already selected
      } else {
        return order;
      }
    });
  };

  useEffect(() => {
    fetchProfile();
    fetchOrdersUser();
  }, []);

  const fetchProfile = async () => {
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
        "http://localhost:8090/api/v1/user/profile",
        { headers }
      );

      //console.log(response.data.data);

      setFirstName(response.data.data.firstname);
      setLastName(response.data.data.lastname);
      setAddress(response.data.data.address);
      setEmail(response.data.data.email);
      setTelephone(response.data.data.telephone);
      setRole(response.data.data.role);
      //setUserId(response.data.data._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchOrdersUser = async () => {
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
        "http://localhost:8090/api/v1/order/getOrdersUser",
        { headers }
      );

      // Set the retrieved orders in the state
      setOrders(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      address: address,
      telephone: telephone,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `http://localhost:8090/api/v1/user/updateUser`,
        formData,
        {
          headers,
        }
      );

      console.log(response);

      if ((response.data.isSuccessful = true)) {
        // console.log("Product added successfully!");
        alert("User Edit successfully!");

        //navigate("/productManagement");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">
          Hello {firstName + " " + lastName}
        </h1>
        <div className="bg-white shadow-lg rounded-lg px-8 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="firstname"
                      className="block text-lg font-semibold mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastname"
                      className="block text-lg font-semibold mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-lg font-semibold mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-lg font-semibold mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="rounded-full h-56 w-56"
                  />
                  <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700">
                    Change Profile Picture
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="mb-4">
                  <label
                    htmlFor="telephone"
                    className="block text-lg font-semibold mb-1"
                  >
                    Telephone
                  </label>
                  <input
                    type="number"
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-lg font-semibold mb-1"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={role}
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Order History</h1>
        <div className="bg-white shadow-lg rounded-lg px-8 py-6">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Order Status</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <React.Fragment key={order._id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.orderdate}</td>
                    <td className="px-4 py-2">{order.orderstatus}</td>
                    <td className="px-4 py-2">
                      {order.paymentid.transactionDetails.amount}
                    </td>
                  </tr>
                  {selectedOrder?._id === order._id && (
                    <tr>
                      <td colSpan={3} className="px-4 py-2">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Products
                          </h3>
                          <ul className="border border-gray-300 rounded-md p-4">
                            {order.products.map((product: any) => (
                              <li
                                key={product._id}
                                className="flex items-center justify-between border-b border-gray-300 py-2"
                              >
                                <div>
                                  <p className="font-semibold">
                                    Product Name:{" "}
                                    {product.productid.productname}
                                  </p>
                                  <p>
                                    Product Price: $
                                    {product.productid.productprice}
                                  </p>
                                  <p>Quantity: {product.quantity}</p>
                                </div>
                                <div className="flex items-center">
                                  {/* Add icons or buttons for more actions */}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {selectedOrder && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Order Status</h2>
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-blue-500 rounded-full text-xs leading-none py-1 text-center text-white"
                  style={{
                    width: `${
                      (orders.findIndex(
                        (order: any) => order._id === selectedOrder._id
                      ) /
                        orders.length) *
                      100
                    }%`,
                  }}
                >
                  {selectedOrder.orderstatus}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
