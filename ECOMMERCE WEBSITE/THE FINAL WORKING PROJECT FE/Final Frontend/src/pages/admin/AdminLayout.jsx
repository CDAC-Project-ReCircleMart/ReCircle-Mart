import { Outlet, Link, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  // temporary admin info (later from API / token)
  const admin = {
    name: "Admin User",
    email: "admin@recirclemart.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="admin-root">
      {/* ---------- LEFT SIDEBAR ---------- */}
      <div className="admin-sidebar">
        {/* PROFILE TOP */}
        <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <div>
            <p className="admin-name">{admin.name}</p>
            <p className="admin-email">{admin.email}</p>
          </div>
        </div>

        {/* MENU */}
        <div className="admin-menu">
          <Link to="/admin/dashboard" className="admin-link">
            Dashboard
          </Link>
          <Link to="/admin/users" className="admin-link">
            Manage Users
          </Link>
          <Link to="/admin/calendar" className="admin-link">
            Calendar
          </Link>
        </div>

        {/* LOGOUT BOTTOM */}
        <div className="admin-logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* ---------- RIGHT PANEL ---------- */}
      <div className="admin-main">
        {/* TOP BAR */}
        <div className="admin-top">
          <h2>Admin Dashboard</h2>
          <span className="admin-date">{today}</span>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="admin-cards">
          <div className="admin-card card-users">
            <p>Total Users</p>
            <h3>120</h3>
          </div>

          <div className="admin-card card-listings">
            <p>Total Listings</p>
            <h3>340</h3>
          </div>

          <div className="admin-card card-visits">
            <p>Visits Today</p>
            <h3>58</h3>
          </div>

          <div className="admin-card card-amount">
            <p>Listings Added</p>
            <h3>12</h3>
          </div>
        </div>

        {/* PAGE CONTENT (other admin pages load here) */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
