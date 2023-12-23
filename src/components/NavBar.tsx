import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.jpg";

// Import the additional FontAwesome icons here
import {
  faHome,
  faCode,
  faFileCode,
  faSignInAlt,
  faUserPlus,
  faBook,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  // const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenC, setIsDropdownOpenC] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdownC = () => {
    setIsDropdownOpenC(!isDropdownOpen);
  };

  const closeDropdownC = () => {
    setIsDropdownOpenC(false);
  };

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    //const data = localStorage.getItem("user");
    // setUser(data ? JSON.parse(data) : null);
    setRole(localStorage.getItem("role") || "");

    //alert(localStorage.getItem("role"));
  }, []);

  return (
    <nav className="bg-blue-700 shadow-lg py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex">
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <a className="text-white text-3xl font-bold ml-5" href="#">
              THE SHOP
            </a>
          </div>

          <div className="md:flex md:items-center space-x-4">
            <ul className="flex space-x-4 text-white">
              {role === "admin" && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/adminHome">
                      <FontAwesomeIcon icon={faHome} /> Dashboard
                    </a>
                  </li>

                  <li
                    className="nav-item relative group"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button className="nav-link focus:outline-none">
                      <FontAwesomeIcon icon={faUser} /> Profile
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-1 fas fa-chevron-down ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`${
                        isDropdownOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      } origin-top-right absolute right-0 mt-2 transition-transform transform-gpu duration-200 ease-in-out ${
                        isDropdownOpen ? "scale-y-100" : "scale-y-0"
                      }`}
                    >
                      <ul className="bg-white text-black border border-gray-200 rounded-lg">
                        <li>
                          <a
                            className="block px-4 py-2 hover:bg-gray-200"
                            href={"/profile"}
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className="block px-4 py-2 hover:bg-gray-200"
                            href={"/resetPassword"}
                          >
                            Change Password
                          </a>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => logOut()}
                          >
                            LogOut
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              )}
              {role === "user" && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/userHome">
                      <FontAwesomeIcon icon={faHome} /> Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/aboutUs">
                      <FontAwesomeIcon icon={faCode} /> About
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/userProducts">
                      <FontAwesomeIcon icon={faGraduationCap} /> Products
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/userContactUs">
                      <FontAwesomeIcon icon={faFileCode} /> Contact Us
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/cartView">
                      <FontAwesomeIcon icon={faFileCode} /> Cart
                    </a>
                  </li>

                  <li
                    className="nav-item relative group"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button className="nav-link focus:outline-none">
                      <FontAwesomeIcon icon={faUser} /> Profile
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-1 fas fa-chevron-down ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`${
                        isDropdownOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      } origin-top-right absolute right-0 mt-2 transition-transform transform-gpu duration-200 ease-in-out ${
                        isDropdownOpen ? "scale-y-100" : "scale-y-0"
                      }`}
                    >
                      <ul className="bg-white text-black border border-gray-200 rounded-lg">
                        <li>
                          <a
                            className="block px-4 py-2 hover:bg-gray-200"
                            href={"/profile"}
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className="block px-4 py-2 hover:bg-gray-200"
                            href={"/resetPassword"}
                          >
                            Change Password
                          </a>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => logOut()}
                          >
                            LogOut
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              )}
              {!role && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link bg-orange-600 rounded text-black px-4 py-2"
                      href="/login"
                    >
                      <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link bg-teal-400 rounded text-black px-4 py-2"
                      href="/register"
                    >
                      <FontAwesomeIcon icon={faUserPlus} /> Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
