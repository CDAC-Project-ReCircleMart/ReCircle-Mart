import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 👈 user comes from AuthProvider

  const onLogout = () => {
    // clear token
    localStorage.removeItem("token");

    // update auth state
    logout();

    // redirect
    navigate("/login");
  };

  const handleSell = () => {
    if (!user) {
      // not logged in → login first
      navigate("/login");
    } else {
      // logged in → add product page
      navigate("/add-product");
    }
  };

  return (
    <>
      <header className="main-header">
        <div className="left-head">
          <div className="logo" onClick={() => navigate("/")}>
            ReCircle Mart
          </div>

          <div className="city-search">
            <i className="fa-solid fa-location-dot"></i>
            <input type="text" placeholder="Search location" />
          </div>

          <div className="main-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more"
            />
          </div>
        </div>

        <div className="right-head">
          <i
            className="fa-regular fa-comments icon"
            onClick={() => navigate("/messages")}
          ></i>

          <i
            className="fa-regular fa-bell icon"
            onClick={() => navigate("/notifications")}
          ></i>

          <i
            className="fa-regular fa-heart icon"
            onClick={() => navigate("/fav")}
          ></i>

          {/* LOGIN only when NOT logged in */}
          {!user && (
            <button className="nav-link" onClick={() => navigate("/login")}>
              Login
            </button>
          )}

          {/* LOGOUT only when logged in */}
          {user && (
            <button onClick={onLogout} className="nav-link">
              Logout
            </button>
          )}

          {/* SELL button */}
          <div className="sell-border" onClick={handleSell}>
            <button className="sell-btn">
              <i className="fa-solid fa-plus"></i> SELL
            </button>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="category-wrapper">
        <div className="dropdown">
          <button className="dropdown-btn">
            ALL CATEGORIES <i className="fa-solid fa-chevron-down"></i>
          </button>

          <div className="dropdown-content">
            <span onClick={() => navigate("/category/cars")}>Cars</span>
            <span onClick={() => navigate("/category/bikes")}>Bikes</span>
            <span onClick={() => navigate("/category/mobiles")}>Mobile Phones</span>
            <span onClick={() => navigate("/category/scooters")}>Scooters</span>
            <span onClick={() => navigate("/category/furniture")}>Furniture</span>
            <span onClick={() => navigate("/category/properties")}>Properties</span>
            <span onClick={() => navigate("/category/jobs")}>Jobs</span>
          </div>
        </div>

        <span onClick={() => navigate("/category/cars")}>Cars</span>
        <span onClick={() => navigate("/category/bikes")}>Motorcycles</span>
        <span onClick={() => navigate("/category/mobiles")}>Mobile Phones</span>
        <span onClick={() => navigate("/category/scooters")}>Scooters</span>
        <span onClick={() => navigate("/category/properties")}>Properties</span>
        <span onClick={() => navigate("/category/jobs")}>Jobs</span>
        <span onClick={() => navigate("/category/electronics")}>Electronics</span>
      </div>
    </>
  );
}
