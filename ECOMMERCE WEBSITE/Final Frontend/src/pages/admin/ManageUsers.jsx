import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "./ManageUsers.css";

export default function ManageUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all"); // all | normal | sellers | admins

  const limit = 8;

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setAllUsers(res.data.users || res.data || []);
    } catch (err) {
      toast.error("Failed to load users");
      console.error("FETCH USERS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= STATS (FRONTEND ONLY) ================= */

  const totalUsers = allUsers.length;

  const totalListings = allUsers.reduce(
    (sum, u) => sum + (u.totalListings || 0),
    0,
  );

  const sellers = allUsers.filter((u) => (u.totalListings || 0) > 0);

  // Active sellers (last 30 days) – fallback: sellers only
  const activeSellers = sellers.length;

  const recentUsers = allUsers.filter((u) => {
    if (!u.created_at) return false;
    const created = new Date(u.created_at);
    const diffDays = (new Date() - created) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;

  /* ================= SEARCH ================= */
  let filteredUsers = allUsers.filter((user) => {
    const text =
      `${user.id} ${user.first_name} ${user.last_name} ${user.email}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  /* ================= FILTER PILLS ================= */
  if (filter === "normal") {
    filteredUsers = filteredUsers.filter(
      (u) => (u.totalListings || 0) === 0 && u.role === "user",
    );
  }

  if (filter === "sellers") {
    filteredUsers = filteredUsers.filter((u) => (u.totalListings || 0) > 0);
  }

  if (filter === "admins") {
    filteredUsers = filteredUsers.filter((u) => u.role === "admin");
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredUsers.length / limit);
  const start = (page - 1) * limit;
  const currentUsers = filteredUsers.slice(start, start + limit);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      setAllUsers(allUsers.filter((u) => u.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="users-root">
      <h3>Manage Users</h3>

      {/* ================= STATS BLOCKS ================= */}
      <div className="stats-grid">
        <div className="stat-card purple">
          <span>Total Users</span>
          <strong>{totalUsers}</strong>
        </div>

        <div className="stat-card green">
          <span>Active Sellers</span>
          <strong>{activeSellers}</strong>
        </div>

        <div className="stat-card orange">
          <span>Total Listings</span>
          <strong>{totalListings}</strong>
        </div>

        <div className="stat-card blue">
          <span>Recent Users</span>
          <strong>{recentUsers}</strong>
        </div>
      </div>

      <hr />

      {/* ================= SEARCH BAR ================= */}
      <div className="users-top">
        <input
          type="text"
          placeholder="Search by ID, name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* ================= FILTER PILLS ================= */}
      <div className="filter-bar">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => {
            setFilter("all");
            setPage(1);
          }}
        >
          All Users
        </button>

        <button
          className={filter === "normal" ? "active" : ""}
          onClick={() => {
            setFilter("normal");
            setPage(1);
          }}
        >
          Normal Users
        </button>

        <button
          className={filter === "sellers" ? "active" : ""}
          onClick={() => {
            setFilter("sellers");
            setPage(1);
          }}
        >
          Sellers
        </button>

        <button
          className={filter === "admins" ? "active" : ""}
          onClick={() => {
            setFilter("admins");
            setPage(1);
          }}
        >
          Admins
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Listings</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No users found
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={
                        user.avatar
                          ? user.avatar.startsWith("/uploads")
                            ? `http://localhost:8080${user.avatar}`
                            : user.avatar
                          : "/profile.png"
                      }
                      alt="profile"
                      className="user-avatar"
                    />
                  </td>

                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>

                  <td>
                    <span className={`role ${user.role}`}>{user.role}</span>
                  </td>

                  <td>{user.totalListings || 0}</td>

                  <td className="action-icons">
                    <i className="fa-solid fa-pen edit-icon"></i>
                    <i
                      className="fa-solid fa-trash delete-icon"
                      onClick={() => handleDelete(user.id)}
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
