import React from "react";

export default function ListingCard({ listing }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{listing.title}</h5>
        <p className="card-text">{listing.description}</p>
        <p className="card-text">
          <strong>Price:</strong> ${listing.price}
        </p>
        <p className="card-text">
          <small className="text-muted">Location: {listing.location}</small>
        </p>
      </div>
    </div>
  );
}
