import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);
  const fetchPending = async () => {
    try {
      const u = await API.get("/admin/users/pending");
      const l = await API.get("/admin/listings/pending");
      setUsers(u.data);
      setListings(l.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveUser = async (id) => {
    await API.post(`/admin/users/${id}/approve`);
    fetchPending();
  };
  const approveListing = async (id) => {
    await API.post(`/admin/listings/${id}/approve`);
    fetchPending();
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Admin Dashboard</h3>
      <h4>Pending Users</h4>
      {users.map((u) => (
        <div key={u.id} className="card">
          {u.name} ({u.email}){" "}
          <button onClick={() => approveUser(u.id)}>Approve</button>
        </div>
      ))}
      <h4>Pending Listings</h4>
      {listings.map((l) => (
        <div key={l.id} className="card">
          {l.title} - {l.price}{" "}
          <button onClick={() => approveListing(l.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
