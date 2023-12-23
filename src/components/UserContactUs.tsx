import axios from "axios";
import React from "react";
import Footer from "./Footer";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const UserContactUs: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = {
        useremail: "user@example.com", // Replace with the user's email if available
        title,
        message,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Change the content type to JSON
      };

      const response = await axios.post(
        "http://localhost:8090/api/v1/contact/createContact",
        formData,
        {
          headers,
        }
      );

      if (response.status === 201) {
        alert("Inquiry added successfully");
        navigate("/userHome");
      }
    } catch (error) {
      console.error("Error adding Inquiry:", error);
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Left Side: Company Information */}
          <div className="w-full lg:w-1/2 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Company Information
              </h2>
              <div className="border-t border-gray-300 py-4">
                <p className="text-lg mb-2 text-gray-700">
                  <span className="font-semibold">Company Name:</span> Your
                  Company
                </p>
                <p className="text-lg mb-2 text-gray-700">
                  <span className="font-semibold">Address:</span> 123 Company
                  St, City, Country
                </p>
                <p className="text-lg mb-2 text-gray-700">
                  <span className="font-semibold">Contact Number:</span> +1 234
                  567 890
                </p>
                {/* Add more company details */}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          {/* Right Side: Contact Form */}
          <div className="w-full lg:w-1/2 px-4">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id="message"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserContactUs;
