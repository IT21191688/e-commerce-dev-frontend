import React from "react";
import DashBoardSidBar from "./DashBoardSideBar";
//import { showSuccessToast } from "./services/AlertService";

const AdminHome: React.FC = () => {
  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>

        <div className="flex flex-wrap justify-center p-5">
          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Dashboard</div>
              <p className="text-gray-700 text-base">
                View overall statistics and summaries
              </p>
            </div>
          </div>
          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Orders</div>
              <p className="text-gray-700 text-base">
                Manage and track customer orders
              </p>
            </div>
          </div>
          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Products</div>
              <p className="text-gray-700 text-base">
                Add, edit, or remove products
              </p>
            </div>
          </div>
          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Customers</div>
              <p className="text-gray-700 text-base">
                Manage customer information and interactions
              </p>
            </div>
          </div>
          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Reports</div>
              <p className="text-gray-700 text-base">
                Generate and analyze sales reports
              </p>
            </div>
          </div>
          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Settings</div>
              <p className="text-gray-700 text-base">
                Configure application settings
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
