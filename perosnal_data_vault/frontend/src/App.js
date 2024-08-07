import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import UserRoutes from "./protectedRoutes/UserRoutes.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Homepage from "./pages/Homepage.jsx";
import AddData from "./pages/AddData.jsx"; 
import ViewData from "./pages/ViewData.jsx"; 

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/add-data" element={<AddData />} /> {/* Ensure this path is defined */}
        <Route path="/view-data" element={<ViewData />} /> {/* Ensure this path is defined */}
        <Route path="/profile" element={<UserProfile />} />
        <Route element={<UserRoutes />}>
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
