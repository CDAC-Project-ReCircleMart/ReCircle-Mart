import React from "react";
import './ListingCard.css';

export default function ListingCard({ listing }) {
  return (
    <div className="card">
      <img
        src={listing.image || "https://images.91wheels.com/assets/b_images/main/models/profile/profile1749638492.jpg?w=530&q=50"}
        alt={listing.title}
      />

      <div className="like">
        <i className="fa-regular fa-heart"></i>
      </div>

      <div className="card-content">
        <div className="price">₹ {listing.price || "42,000"}</div>
        <div className="meta">{listing.year || "2025"} · {listing.km || "1,607 km"}</div>
        <div className="title">{listing.title || "EeVe Your"}</div>
        <div className="bottom">
          <span className="location">{listing.location || "Firdaus Colony"}</span>
          <span className="timestamp">Today</span>
        </div>
      </div>
    </div>
  );
}
