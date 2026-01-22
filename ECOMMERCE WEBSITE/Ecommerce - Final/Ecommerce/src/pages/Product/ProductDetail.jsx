/**
 * ProductDetail.jsx
 * Shows full details of a selected listing
 * Data source: local listings (temporary)
 */

import { useParams, useNavigate } from "react-router-dom";
import { listings } from "../../data";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = listings.find((l) => l.id === Number(id));

  if (!listing) {
    return (
      <div className="product-wrapper">
        <div className="product-not-found">
          <p>Listing not found.</p>
          <button className="post-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-wrapper">
      <div className="product-card">
        {/* LEFT: IMAGE */}
        <img
          src={listing.image}
          alt={listing.title}
          className="product-image"
        />

        {/* RIGHT: INFO */}
        <div className="product-info">
          <h2 className="product-title">{listing.title}</h2>

          <div className="product-price">{listing.price}</div>

          <div className="product-meta">
            <p>
              <i className="fa-solid fa-user"></i>
              {listing.owner || "Seller"}
            </p>

            <p>
              <i className="fa-solid fa-location-dot"></i>
              {listing.location}
            </p>

            <p>
              <i className="fa-solid fa-clock"></i>
              Posted {listing.date}
            </p>

            <p>
              <i className="fa-solid fa-gas-pump"></i>
              {listing.fuel || "Petrol"}
            </p>
          </div>

          <div className="product-description">
            <h4>Description</h4>
            <p>
              {listing.description || "No additional description provided."}
            </p>
          </div>

          <button className="post-btn" onClick={() => navigate("/messages")}>
            Chat with Seller
          </button>
        </div>
      </div>
    </div>
  );
}
