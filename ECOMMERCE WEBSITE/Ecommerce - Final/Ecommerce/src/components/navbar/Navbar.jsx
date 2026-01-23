import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleSell = () => {
    if (!user) navigate("/login");
    else navigate("/sell"); // lowercase is safer
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* TOP HEADER */}
      <header className="main-header">
        <div className="left-head">
          <div className="logo" onClick={() => navigate("/")}>
            Recircle Mart
            <img
              className="logo-img mr-10"
              style={{ width: "50px", height: "auto" }}
              src="logo.png"
            ></img>
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
            onClick={() => navigate("/favourites")}
          ></i>

          {!user ? (
            <button className="nav-link" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <div className="profile-nav">
              <img
                src={user.icon}
                alt="profile"
                className="nav-profile"
                onClick={() => navigate("/profile")}
              />
              <span>{user.firstName}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          <div className="sell-border" onClick={handleSell}>
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

        {/* DATE AT RIGHT END (INSIDE BAR) */}
        <span className="category-date">{today}</span>
      </div>
    </>
  );
}
