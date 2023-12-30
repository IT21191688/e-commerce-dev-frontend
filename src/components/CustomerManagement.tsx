import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedTelephone, setEditedTelephone] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedRole, setEditedRole] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
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
        "https://div-stack-backend.onrender.com/api/v1/user/getAllUser",
        {
          headers,
        }
      );
      showSuccessToast("Success Loading Customer Data");
      setCustomers(response.data.data);
    } catch (error) {
      showErrorToast("Error fetching customer data");
      console.error("Error fetching customer data:", error);
    }
  };

  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    const modal = new bootstrap.Modal(
      document.getElementById("exampleModal") as HTMLElement
    );

    setEditedFirstName(customer.firstname);
    setEditedLastName(customer.lastname);
    setEditedEmail(customer.email);
    setEditedTelephone(customer.telephone);
    setEditedAddress(customer.address);
    setEditedRole(customer.role);
    modal.show();
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    window.location.reload();
  };

  const handleEditCustomer = async () => {
    const userId = selectedCustomer._id;

    try {
      const updatedCustomerData = {
        firstname: editedFirstName,
        lastname: editedLastName,
        email: editedEmail,
        telephone: editedTelephone,
        address: editedAddress,
        role: editedRole,
      };

      //console.log(updatedCustomerData);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `https://div-stack-backend.onrender.com/api/v1/user/updateUser/${userId}`,
        updatedCustomerData,
        {
          headers,
        }
      );

      if (response.status === 201) {
        showSuccessToast("Customer data updated");
      }

      setEditedFirstName("");
      setEditedLastName("");
      setEditedEmail("");
      setEditedTelephone("");
      setEditedAddress("");
      setEditedRole("");

      const modal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modal.hide();

      // Refetch customers to update the displayed list after the changes
      fetchCustomers();
    } catch (error: any) {
      console.error("Error updating customer data:", error);
      alert("Error updating customer data:" + error.response.data.message);
    }
  };

  const filteredCustomers = customers.filter((customer: any) =>
    customer.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <div
          className="container mx-auto mt-5"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <input
            type="text"
            placeholder="Search by First Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-3"
          />
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Telephone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer: any) => (
                <tr key={customer.id}>
                  <td className="border px-4 py-2">
                    {customer.firstname} {customer.lastname}
                  </td>
                  <td className="border px-4 py-2">{customer.email}</td>
                  <td className="border px-4 py-2">{customer.telephone}</td>
                  <td className="border px-4 py-2">{customer.address}</td>
                  <td className="border px-4 py-2">{customer.role}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {selectedCustomer && (
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Customer
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="col-form-label">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={editedFirstName}
                      onChange={(e) => setEditedFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={editedLastName}
                      onChange={(e) => setEditedLastName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Telephone:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={editedTelephone}
                      onChange={(e) => setEditedTelephone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Address:</label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Role:</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={editedRole}
                      onChange={(e) => setEditedRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditCustomer}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
