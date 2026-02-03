import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUnreadCount } from "../../services/notificationApi";
import "./Navbar.css"
export default function Navbar({ onLoginClick }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [citySearch, setCitySearch] = useState("");
  const [mainSearch, setMainSearch] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (user) {
        try {
          const count = await getUnreadCount();
          setUnreadCount(count);
        } catch (error) {
          console.error("Failed to fetch unread count:", error);
        }
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleSell = () => {
    if (!user) navigate("/login");
    else navigate("/sell");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("e2ee_pub");
    localStorage.removeItem("e2ee_priv");
    localStorage.removeItem("favourites");
    navigate("/");
  };

  const handleCitySearch = () => {
    const v = citySearch.trim();
    const params = new URLSearchParams(location.search);

    if (!v) params.delete("city");
    else params.set("city", v);

    navigate(`/?${params.toString()}`);
  };

  const handleMainSearch = () => {
    const v = mainSearch.trim();
    const params = new URLSearchParams(location.search);

    if (!v) params.delete("q");
    else params.set("q", v);

    navigate(`/?${params.toString()}`);
  };


  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container-fluid px-3 px-lg-4">
          {/* Brand */}
          <div
            className="navbar-brand d-flex align-items-center gap-2"
            role="button"
            onClick={() => navigate("/")}
          >
            <img
              src="logo.png"
              alt="logo"
              width="34"
              height="34"
              className="rounded"
              style={{ objectFit: "cover" }}
            />
            <span className="fw-semibold text-dark">ReCircle Mart</span>
          </div>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            {/* SEARCHES */}
            <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 mx-lg-4 my-3 my-lg-0 w-100">
              {/* City */}
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Location"
                  value={citySearch}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCitySearch(v);

                    // ✅ if cleared, remove city from URL so all products show
                    if (v.trim() === "") {
                      const params = new URLSearchParams(location.search);
                      params.delete("city");
                      const s = params.toString();
                      navigate(s ? `/?${s}` : "/", { replace: true });
                    }
                  }} onKeyDown={(e) => e.key === "Enter" && handleCitySearch()}
                />
                <button className="btn btn-outline-dark" onClick={handleCitySearch}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>

              {/* Main search */}
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search products"
                  value={mainSearch}
                  onChange={(e) => {
                    const v = e.target.value;
                    setMainSearch(v);

                    // ✅ if cleared, remove q from URL so all products show
                    if (v.trim() === "") {
                      const params = new URLSearchParams(location.search);
                      params.delete("q");
                      const s = params.toString();
                      navigate(s ? `/?${s}` : "/", { replace: true });
                    }
                  }} onKeyDown={(e) => e.key === "Enter" && handleMainSearch()}
                />
                <button className="btn btn-dark" onClick={handleMainSearch}>
                  Search
                </button>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="d-flex align-items-center gap-2 ms-lg-auto pb-3 pb-lg-0">
              {/* Messages */}
              <button
                className="btn btn-light border d-flex align-items-center justify-content-center"
                style={{ width: 42, height: 42 }}
                onClick={() => navigate("/messages")}
                title="Messages"
              >
                <img
                  src="chatting.png"
                  alt="chat"
                  width="20"
                  height="20"
                  style={{ objectFit: "contain" }}
                />
              </button>

              {/* Notifications */}
              <button
                className="btn btn-light border position-relative d-flex align-items-center justify-content-center"
                style={{ width: 42, height: 42 }}
                onClick={() => navigate("/notifications")}
                title="Notifications"
              >
                <i className="fa-regular fa-bell"></i>
                {unreadCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.70rem" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Favourites */}
              <button
                className="btn btn-light border d-flex align-items-center justify-content-center"
                style={{ width: 42, height: 42 }}
                onClick={() => navigate("/favourites")}
                title="Favourites"
              >
                <i className="fa-regular fa-heart"></i>
              </button>

              {/* Auth area */}
              {!user ? (
                <button className="btn btn-outline-dark" onClick={onLoginClick}>
                  Login
                </button>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-light border d-flex align-items-center gap-2"
                    onClick={() => navigate("/profile")}
                    title="Profile"
                  >
                    <img
                      src={user.avatar || "profile.png"}
                      alt="profile"
                      width="28"
                      height="28"
                      className="rounded-circle"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="d-none d-xl-inline fw-semibold">
                      {user.first_name || user.firstName}
                    </span>
                  </button>

                  <button className="btn btn-outline-danger" onClick={handleLogout} title="Logout">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </button>
                </div>
              )}

              {/* Sell */}
              <button
                className="btn btn-primary fw-semibold d-flex align-items-center gap-2"
                onClick={handleSell}
              >
                <i className="fa-solid fa-tag"></i> SELL
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* FILTER BAR */}
      <div className="bg-white border-bottom">
        <div className="container-fluid px-3 px-lg-4 py-2 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/?days=1")}>
              Yesterday
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/?days=3")}>
              3 Days Ago
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/?days=7")}>
              7 Days Ago
            </button>
          </div>

          <div className="text-muted small">
            Today, <span className="fw-semibold">{today}</span>
          </div>
        </div>
      </div>
    </>
  );
}
