import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "./ManageUsers.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // edit modal state
  const [editUser, setEditUser] = useState(null);
  const [editRole, setEditRole] = useState("");

  const limit = 6;

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await api.get(
        `/admin/users?page=${page}&limit=${limit}&search=${search}`,
      );

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error("Failed to load users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  /* ================= DELETE USER ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (user) => {
    setEditUser(user);
    setEditRole(user.role);
  };

  /* ================= UPDATE USER ================= */
  const handleUpdate = async () => {
    try {
      await api.put(`/admin/users/${editUser.id}`, {
        role: editRole,
      });

      toast.success("User updated");
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="users-root">
      {/* -------- TOP BAR -------- */}
      <div className="users-top">
        <h3>Manage Users</h3>

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

      {/* -------- TABLE -------- */}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Total Listings</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const isSeller = user.totalListings > 0;

              return (
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

                  {/* ROLE BADGE */}
                  <td>
                    {isSeller ? (
                      <span className="role seller">Seller</span>
                    ) : (
                      <span className="role user">User</span>
                    )}
                  </td>

                  <td>{user.totalListings}</td>

                  {/* ACTIONS */}
                  <td>
                    <button className="edit-btn" onClick={() => openEdit(user)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* -------- PAGINATION -------- */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editUser && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit User</h3>

            <p>
              <strong>Name:</strong> {editUser.first_name} {editUser.last_name}
            </p>
            <p>
              <strong>Email:</strong> {editUser.email}
            </p>

            <label>Role</label>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleUpdate} className="save-btn">
                Save Changes
              </button>
              <button onClick={() => setEditUser(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
