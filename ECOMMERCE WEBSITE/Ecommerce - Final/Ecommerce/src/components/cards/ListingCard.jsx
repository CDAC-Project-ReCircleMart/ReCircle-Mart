/**
 * ListingCard.jsx
 * Like (favourite) UI only
 */

import { useState } from "react";
import "./ListingCard.css";

export default function ListingCard({ item }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation(); // prevent card click
    setLiked(!liked);
  };

  return (
    <div className="olx-card">
      {/* Image */}
      <div className="card-img">
        <img
          src={item?.image || "https://via.placeholder.com/300x200"}
          alt={item?.title || "product"}
        />

        {/* Like icon */}
        <span className={`fav ${liked ? "active" : ""}`} onClick={toggleLike}>
          <i
            className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        </span>
      </div>

      {/* Content */}
      <div className="card-body">
        <div className="price">{item?.price}</div>

        <div className="meta">
          {item?.year} · {item?.km}
        </div>

        <div className="title">{item?.title}</div>

        <div className="bottom">
          <span>{item?.location}</span>
          <span>{item?.date}</span>
        </div>
      </div>
    </div>
  );
}
