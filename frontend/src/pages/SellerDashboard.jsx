import React, { useEffect, useState } from "react";
import API from "../api/api";
import ListingCard from "../components/ListingCard";
import { Link } from "react-router-dom";

export default function SellerDashboard() {
  const [listings, setListings] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Assuming user is stored in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      API.get(`/seller/listings/${user.id}`)
        .then((r) => setListings(r.data))
        .catch(() => {});
      API.get(`/seller/sales/${user.id}`)
        .then((r) => setSales(r.data))
        .catch(() => {});
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Seller Dashboard</h2>
      <h3 className="mb-3">My Listings</h3>
      <div className="row">
        {listings.map((l) => (
          <div key={l.id} className="col-md-4 col-sm-6 mb-4">
            <ListingCard listing={l} showStatus={true} status={l.status} />
          </div>
        ))}
      </div>
      <h3 className="mb-3">My Sales</h3>
      <div className="row">
        {sales.map((s) => (
          <div key={s.id} className="col-md-4 col-sm-6 mb-4">
            <ListingCard
              listing={s.listing}
              showStatus={true}
              status={s.status}
              buyer={s.buyer?.name}
            />
          </div>
        ))}
      </div>
      <Link to="/create-listing" className="btn btn-primary mt-3">
        ➕ Create New Listing
      </Link>
    </div>
  );
}
