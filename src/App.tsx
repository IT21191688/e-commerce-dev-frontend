import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import AdminHome from "./components/AdminHome";
import UserHome from "./components/UserHome";

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setUser(storedRole ? storedRole : null);

    const handleBeforeUnload = () => {
      // Clear the user data from localStorage when the browser is closed
      localStorage.removeItem("role");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <NavBar />

      {user === "admin" ? (
        <Router>
          <Routes>
            <Route path="/adminHome" element={<AdminHome />} />
          </Routes>
        </Router>
      ) : user === "user" ? (
        <Router>
          <Routes>
            {/*<Route exact path='/userHome/:token/:role' element={<UserHome />} />*/}
            <Route path="/userHome" element={<UserHome />} />
          </Routes>
        </Router>
      ) : null}

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
