import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function BuyerDashboard() {
  const [purchases, setPurchases] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Assuming user is stored in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      API.get(`/buyer/purchases/${user.id}`)
        .then((r) => setPurchases(r.data))
        .catch(() => {});
      API.get(`/buyer/favorites/${user.id}`)
        .then((r) => setFavorites(r.data))
        .catch(() => {});
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Buyer Dashboard</h2>
      <h3>My Purchases</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {purchases.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <h4>{p.listing.title}</h4>
            <p>₹{p.listing.price}</p>
            <p>Status: {p.status}</p>
          </div>
        ))}
      </div>
      <h3>Favorites</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {favorites.map((f) => (
          <div key={f.id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <h4>{f.title}</h4>
            <p>₹{f.price}</p>
            <Link to={`/listings/${f.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
