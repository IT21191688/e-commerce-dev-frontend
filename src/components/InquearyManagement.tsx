import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { showErrorToast } from "./services/AlertService";

const InquiryManagement: React.FC = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  //const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
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
        "http://localhost:8090/api/v1/contact/getAllContacts",
        {
          headers,
        }
      );

      setInquiries(response.data.data);
    } catch (error) {
      showErrorToast("Error fetching inquiry data");
      console.error("Error fetching inquiry data:", error);
    }
  };

  const handleStatusChange = async (status: string, contactId: string) => {
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
        `http://localhost:8090/api/v1/contact/updateContact/${contactId}`,
        { status: status },
        { headers }
      );

      console.log(response);

      if (response.status === 200) {
        alert("Status updated successfully");
        fetchInquiries();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredInquiries = inquiries.filter((inquiry: any) =>
    inquiry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold">Inquiry Management</h1>
        </div>
        <div className="container mx-auto mt-5">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-3"
          />
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry: any) => (
                <tr key={inquiry._id}>
                  <td className="border px-4 py-2">
                    {inquiry.userId.firstname + " " + inquiry.userId.lastname}
                  </td>
                  <td className="border px-4 py-2">{inquiry.userId.email}</td>
                  <td className="border px-4 py-2">{inquiry.title}</td>
                  <td className="border px-4 py-2">{inquiry.message}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={inquiry.status}
                      onChange={(e) => {
                        handleStatusChange(e.target.value, inquiry._id);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InquiryManagement;
