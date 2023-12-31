import axios from "axios";
import React from "react";
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";
import profileImage from "../assets/profile.png";

const AboutUs: React.FC = () => {
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
        "https://div-stack-backend.onrender.com/api/v1/contact/createContact",
        formData,
        {
          headers,
        }
      );

      if (response.status === 201) {
        showSuccessToast("Inquiry added successfully");

        setTimeout(() => {
          navigate("/userHome");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showErrorToast("Error adding Inquiry");
      console.error("Error adding Inquiry:", error);
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

        {/* Company Overview Section */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
          <p className="text-lg text-gray-700">
            Welcome to [Your Company Name], your one-stop destination for
            quality products and exceptional service. Founded in [Year], we are
            dedicated to providing our customers with a seamless shopping
            experience and offering a wide range of premium products in [Product
            Category/Industry]. Our mission is to [Mission Statement].
          </p>
        </section>

        {/* Our Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="flex flex-wrap -mx-4">
            {/* Team Member Cards */}
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={profileImage}
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-gray-700">Co-founder & CEO</p>
                <p className="text-gray-600">
                  Bringing innovation and leadership
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={profileImage}
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-gray-700">Co-founder & CEO</p>
                <p className="text-gray-600">
                  Bringing innovation and leadership
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={profileImage}
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-gray-700">Co-founder & CEO</p>
                <p className="text-gray-600">
                  Bringing innovation and leadership
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <div className="flex flex-wrap -mx-4">
            {/* Testimonial Cards */}
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  "I am impressed with the quality of products and the excellent
                  customer service provided by [Your Company Name]. Definitely
                  recommending it to friends and family!"
                </p>
                <p className="text-gray-600 font-semibold">- Happy Customer</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  "I am impressed with the quality of products and the excellent
                  customer service provided by [Your Company Name]. Definitely
                  recommending it to friends and family!"
                </p>
                <p className="text-gray-600 font-semibold">- Happy Customer</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  "I am impressed with the quality of products and the excellent
                  customer service provided by [Your Company Name]. Definitely
                  recommending it to friends and family!"
                </p>
                <p className="text-gray-600 font-semibold">- Happy Customer</p>
              </div>
            </div>
          </div>
        </section>
        <br />
        <hr />
        <br />
        <div className="flex flex-wrap -mx-4">
          {/* Left Side: Company Information */}
          <div className="w-full lg:w-1/2 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Company Information
              </h2>
              <div className="border-t border-gray-300 py-4">
                <p className="text-lg mb-2 text-gray-700">
                  <span className="font-semibold">Company Name:</span>THE SHOP
                </p>
                <p className="text-lg mb-2 text-gray-700">
                  <span className="font-semibold">Address:</span> 123 Company
                  Malabe,Sri Lanka
                </p>
                <p className="text-lg mb-2 text-gray-700">
                  <span className="font-semibold">Contact Number:</span>
                  0473130538
                </p>
              </div>
            </div>
          </div>
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

export default AboutUs;
