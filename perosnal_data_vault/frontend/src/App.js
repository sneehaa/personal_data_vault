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
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminRoutes from "./protectedRoutes/AdminRoutes.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import EditData from "./pages/EditData.jsx";
import ManageData from "./pages/admin/ManageData.jsx";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [localStorage.getItem("user")]);

  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/create_data" element={<AddData />} />
        <Route path='/edit/:id' element={<EditData />} />
        <Route path="/view-data" element={<ViewData />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route element={<UserRoutes />}>
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
        {isAdmin && (
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/manage-data" element={<ManageData/>} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
