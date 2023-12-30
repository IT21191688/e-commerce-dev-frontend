import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "./services/AlertService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [jwtToken, setJwtToken] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // console.log(email, password);

    //alert(email + " " + password);

    try {
      const response = await axios.post(
        "https://div-stack-backend.onrender.com/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );

      const { data } = response.data;

      console.log(response.data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "admin") {
        //showSuccessToast("Login successful! Admin");

        showSuccessToast("Login successful!");
        setTimeout(() => {
          navigate("/adminHome");
          window.location.reload();
        }, 2000);
      } else {
        showSuccessToast("Login successful!");
        setTimeout(() => {
          navigate("/userHome");
          window.location.reload();
        }, 2000);
        // showSuccessToast("Login successful!");
      }

      // window.location.reload();
    } catch (error) {
      navigate("/login");
      showErrorToast("Login Unsuccessfull!");
    }
  };

  const googleAuth = async () => {
    alert("Error occured");
    /*
    try {
      const popup = window.open(
        "http://localhost:8090/api/v1/auth/auth/google",
        "_blank",
        "width=600,height=600"
      );

      const receiveMessage = (event: MessageEvent) => {
        if (
          event.origin === "http://localhost:8090" &&
          event.data.token &&
          event.data.role
        ) {
          const { token, role } = event.data;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          popup?.close();
          window.removeEventListener("message", receiveMessage);

          // You can perform further actions after successful authentication,
          // such as redirecting the user or updating the UI
          console.log("Login successful");
        }
      };

      window.addEventListener("message", receiveMessage);
    } catch (error) {
      alert("Login Unsuccessful");
      console.log(error);
    }
    */
  };

  function handleSignUp() {
    navigate("/register");
    window.location.reload();
  }

  return (
    <div className=" min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full lg:w-1/3 lg:px-10 flex justify-center items-center">
        <div className="w-full lg:w-auto mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold">Welcome to The Shop</h1>
          <p className="mt-2 text-lg">
            Your go-to destination for all your shopping needs!
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded shadow-lg max-w-md mx-autow-full lg:w-2/3 ">
        <div className="bg-white p-8">
          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            Customer Login
          </h1>

          <form className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-primary"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-primary"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
          <br></br>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
              style={{ backgroundColor: "#3490dc" }} // Temporary inline style for verification
              onClick={handleSubmit}
            >
              Login
            </button>
            <br></br>

            <button
              type="submit"
              className="bg-orange-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
              style={{ backgroundColor: "#ED8936" }}
              onClick={handleSignUp} // Temporary inline style for verification
            >
              Sign Up
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                className="bg-white border border-gray-300 rounded-md flex items-center justify-center p-2 w-48 mx-auto hover:border-gray-400 hover:shadow transition duration-150"
                onClick={googleAuth}
              >
                <img
                  className="w-6 h-6 mr-2"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google Logo"
                />
                Sign in with Google
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/resetPassword"
                className="text-blue-500 hover:underline"
              >
                Forgot Your Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
