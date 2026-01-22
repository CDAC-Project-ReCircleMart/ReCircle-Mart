/**
 * Navbar.jsx
 * Top navigation bar + category bar
 * Used on public pages (Home, ProductDetail, etc.)
 * UI and behavior kept EXACTLY same
 */

import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      {/* TOP HEADER */}
      <header className="main-header">
        <div className="left-head">
          <div className="logo" onClick={() => navigate("/")}>
            OLX Ecommerce
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
            onClick={() => navigate("/Favourites")}
          ></i>

          <button className="nav-link" onClick={() => navigate("/login")}>
            Login
          </button>

          <div className="sell-border" onClick={() => navigate("/sell")}>
            <button className="sell-btn">
              <i className="fa-solid fa-plus"></i> SELL
            </button>
          </div>
        </div>
      </header>

      {/* CATEGORY BAR */}
      <div className="category-wrapper">
        <div className="dropdown">
          <button className="dropdown-btn">
            ALL CATEGORIES <i className="fa-solid fa-chevron-down"></i>
          </button>

          <div className="dropdown-content">
            <a href="#">Cars</a>
            <a href="#">Bikes</a>
            <a href="#">Mobile Phones</a>
            <a href="#">Scooters</a>
            <a href="#">Furniture</a>
            <a href="#">Properties</a>
            <a href="#">Jobs</a>
          </div>
        </div>

        <span>Cars</span>
        <span>Motorcycles</span>
        <span>Mobile Phones</span>
        <span>Scooters</span>
        <span>Properties</span>
        <span>Jobs</span>
        <span>Electronics</span>
        <span>Furniture</span>
      </div>
    </>
  );
}
