import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listings } from "../data";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find((l) => l.id === Number(id));

  if (!listing) {
    return (
      <div className="product-wrapper">
        <p>Listing not found.</p>
        <button className="post-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-wrapper">
      <div className="product-card">
        {/* PRODUCT IMAGE */}
        <img
          src={listing.image}
          alt={listing.title}
          className="product-image"
        />

        {/* PRODUCT INFO */}
        <div className="product-info">
          {/* TITLE */}
          <h2 className="product-title">{listing.title}</h2>

          {/* PRICE */}
          <div className="product-price">{listing.price}</div>

          {/* OWNER */}
          <p className="product-owner">
            <i className="fa-solid fa-user"></i>
            {listing.owner || "Owner Name Not Provided"}
          </p>

          {/* LOCATION */}
          <p className="product-location">
            <i className="fa-solid fa-location-dot"></i>
            {listing.location}
          </p>

          {/* DATE / TIMESTAMP */}
          <p className="product-date">
            <i className="fa-solid fa-clock"></i>
            Posted: {listing.date}
          </p>

          {/* FUEL TYPE */}
          <p className="product-fuel">
            <i className="fa-solid fa-gas-pump"></i>
            {listing.fuel || "Petrol"}
          </p>

          {/* DESCRIPTION */}
          <p className="product-description">
            {listing.description || "No additional description provided."}
          </p>
        </div>
      </div>
    </div>
  );
}
