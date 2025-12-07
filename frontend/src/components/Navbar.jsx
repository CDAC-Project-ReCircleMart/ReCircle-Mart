import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="olx-header">
      {/* Logo */}
      <Link to="/" className="logo">
        OLX Ecommerce
      </Link>

      <div className="search-bar">
        <div className="city-search">
          <i className="fa fa-location-dot"></i>
          <input type="text" placeholder="Search city, area or location" />
        </div>

        <div className="main-search">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Find Cars, Mobile Phones and more" />
        </div>
      </div>

      {/* Right Side */}
      <div className="header-icons">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="profile">
              <i className="fa fa-user"></i> Profile
            </Link>
            <Link to="/seller-dashboard" className="profile">
              Dashboard
            </Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}

        <Link to="/create-listing" className="sell-btn">
          + SELL
        </Link>
      </div>
    </header>
  );
}
