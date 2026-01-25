import { useState } from "react";
import "./ManageUsers.css";

/* 🔹 HARD CODED USERS (LATER FROM BACKEND API) */
const allUsers = [
  {
    id: 1,
    name: "Rohit Kavathekar",
    email: "rohit@gmail.com",
    avatar: "/profile.png",
    listings: 3,
  },
  {
    id: 2,
    name: "Amit Sharma",
    email: "amit@gmail.com",
    avatar: "/profile.png",
    listings: 0,
  },
  {
    id: 3,
    name: "Sneha Patil",
    email: "sneha@gmail.com",
    avatar: "/profile.png",
    listings: 5,
  },
  {
    id: 4,
    name: "John Doe",
    email: "john@gmail.com",
    avatar: "/profile.png",
    listings: 0,
  },
  {
    id: 5,
    name: "Neha Singh",
    email: "neha@gmail.com",
    avatar: "/profile.png",
    listings: 2,
  },
  {
    id: 6,
    name: "Rahul Mehta",
    email: "rahul@gmail.com",
    avatar: "/profile.png",
    listings: 0,
  },
];

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 4;

  /* 🔹 FILTER USERS BY SEARCH */
  const filteredUsers = allUsers.filter((user) =>
    `${user.id} ${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  /* 🔹 PAGINATION LOGIC */
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const start = (page - 1) * perPage;
  const currentUsers = filteredUsers.slice(start, start + perPage);

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
            {currentUsers.map((user) => {
              const isSeller = user.listings > 0;

              return (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.avatar}
                      alt="profile"
                      className="user-avatar"
                    />
                  </td>

                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  {/* ROLE BADGE */}
                  <td>
                    {isSeller ? (
                      <span className="role seller">Seller</span>
                    ) : (
                      <span className="role user">User</span>
                    )}
                  </td>

                  <td>{user.listings}</td>

                  {/* ACTIONS */}
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
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
    </div>
  );
}
