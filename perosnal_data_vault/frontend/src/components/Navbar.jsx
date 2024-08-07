import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Navbar = () => {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleItemClick = (itemName) => {
    setActivePage(itemName);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" style={{ height: "70px" }} />
      </div>
      <div className="navbar-items">
        <Link
          to="/homepage"
          className={activePage === "home" ? "active" : ""}
          onClick={() => handleItemClick("home")}
        >
          Home
        </Link>
      
      </div>
      <form className="d-flex gap-2" role="search">
        {user ? (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Welcome, {user.firstName}!
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/reset-password">
                  Change password
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <button onClick={handleLogin} className="btn btn-outline-danger" type="button">
              Login
            </button>
            <button onClick={handleRegister} className="btn btn-outline-success" type="button">
              Register
            </button>
          </>
        )}
      </form>
    </nav>
  );
};

export default Navbar;
