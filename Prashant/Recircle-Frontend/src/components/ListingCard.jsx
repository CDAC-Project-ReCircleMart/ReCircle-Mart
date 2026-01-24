import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListingCard.css"; // ✅ IMPORTANT

export default function ListingCard({ item }) {
  const navigate = useNavigate();

  // 🔹 Category-based placeholder images
  const placeholderImages = {
    Cars: "/images/car.png",
    Bikes: "/images/bike.png",
    Mobiles: "/images/mobile.png",
    Electronics: "/images/electronics.png",
    Properties: "/images/property.png",
    Jobs: "/images/job.png"
  };

  return (
    <div
      className="listing-card"
      onClick={() => navigate(`/product/${item.productId}`)}
    >
      {/* Image */}
      <div className="listing-image">
        <img
          src={
            item.imageUrl ||
            placeholderImages[item.categoryName] ||
            "/images/default.png"
          }
          alt={item.title}
        />
      </div>

      {/* Details */}
      <div className="listing-details">
        <h3 className="price">₹ {item.price}</h3>

        <p className="title">{item.title}</p>

        {/* 🔹 SHOW KM ONLY FOR CARS */}
        {item.categoryName === "Cars" && item.kmDriven && (
          <p className="meta">
            {item.year && `${item.year} • `}{item.kmDriven} km
          </p>
        )}

        {/* 🔹 NON-CAR META */}
        {item.categoryName !== "Cars" && (
          <p className="meta">{item.categoryName}</p>
        )}

        <div className="location-row">
          <span className="location">{item.location}</span>
          <span className="date">
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Today"}
          </span>
        </div>
      </div>
    </div>
  );
}
