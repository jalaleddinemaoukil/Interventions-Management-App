import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../utils/axiosInstance';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/users/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">

          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a  className="nav-link">
           <Link to="/dashboard" > Home</Link>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
