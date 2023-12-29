import React from "react";
import { useNavigate } from "react-router-dom";

const DashBoardSidBar: React.FC = () => {
  const navigate = useNavigate();

  const handeCustomerManage = () => {
    navigate("/customerManagement");
  };

  const handeProductManage = () => {
    navigate("/productManagement");
  };

  const handleOrderManagement = () => {
    navigate("/orderManagement");
  };

  const handleInquearyManage = () => {
    navigate("/inquaryManagement");
  };

  const handleReviewManage = () => {
    navigate("/reviewManagement");
  };

  const handlePaymentManage = () => {
    navigate("/paymentManagement");
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="mt-2">Welcome, Admin!</p>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Dashboard
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleOrderManagement}
            >
              Orders
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handeProductManage}
            >
              Products
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handeCustomerManage}
            >
              Customers
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleInquearyManage}
            >
              Inqueary
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleReviewManage}
            >
              Reviews
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handlePaymentManage}
            >
              Payments
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Reports
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Settings
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashBoardSidBar;
