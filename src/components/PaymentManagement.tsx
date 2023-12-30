import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSideBar from "./DashBoardSideBar";
import { showErrorToast } from "./services/AlertService";

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
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
        "http://localhost:8090/api/v1/payment/retriveAllPayment",
        { headers }
      );

      setPayments(response.data.data);
      setFilteredPayments(response.data.data);
    } catch (error) {
      showErrorToast("Error fetching payments:");
      console.error("Error fetching payments:", error);
    }
  };

  const handleUsernameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchUsername(searchValue);

    const filtered = payments.filter(
      (payment: any) =>
        payment.userId.firstname.toLowerCase().includes(searchValue) ||
        payment.userId.lastname.toLowerCase().includes(searchValue) ||
        payment._id.toLowerCase().includes(searchValue)
    );

    setFilteredPayments(filtered);
  };

  const handleDateFilter = () => {
    // Your existing code for date filtering
  };

  return (
    <div className="flex h-screen">
      <DashBoardSideBar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4">Payment Management</h1>
        <div className="flex items-center mb-4">
          <div className="flex items-center pr-4">
            <input
              type="text"
              value={searchUsername}
              onChange={handleUsernameSearch}
              placeholder="Search by username"
              className="mr-2 px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="Filter by date"
              className="mr-2 px-2 py-1 border border-gray-300 rounded"
            />
            <button
              onClick={handleDateFilter}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Filter
            </button>
          </div>
        </div>

        <div
          className="overflow-x-auto"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Payment ID</th>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Payment Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment: any) => (
                <tr key={payment._id}>
                  <td className="border px-4 py-2">{payment._id}</td>
                  <td className="border px-4 py-2">
                    {payment.userId.firstname + " " + payment.userId.lastname}
                  </td>
                  <td className="border px-4 py-2">{payment.paymentMethod}</td>
                  <td className="border px-4 py-2">
                    {payment.transactionDetails.amount}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
