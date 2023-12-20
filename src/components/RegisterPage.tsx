import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Prepare the user object with the entered details
      const user = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        telephone: telephone,
        address: address,
        password: password,
        role: "user",
      };

      const response = await axios.post(
        "http://localhost:8090/api/v1/user/register",
        {
          user: user,
        }
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setTelephone("");
      setAddress("");
      setPassword("");

      if (response.status == 201) {
        navigate("/login");
        window.location.reload();
      } else {
        alert(response.data.message);
        navigate("/register");
        window.location.reload();
      }
    } catch (error: any) {
      alert("Error occurred:" + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Customer Register
        </h1>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700"
            >
              Telephone
            </label>
            <input
              type="tel"
              id="telephone"
              className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full py-2 px-3 rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white rounded-md py-2 px-3 focus:ring focus:ring-opacity-50 focus:ring-blue-400 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
