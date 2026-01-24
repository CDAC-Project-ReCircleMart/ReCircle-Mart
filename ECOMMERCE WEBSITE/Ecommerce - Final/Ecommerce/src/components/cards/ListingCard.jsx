import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListingCard.css";

export default function ListingCard({ item }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="olx-card" onClick={() => navigate(`/product/${item.id}`)}>
      {/* IMAGE AREA */}
      <div className="card-img p-2">
        <img src={item.image} alt={item.title} />

        {/* FAV ICON */}
        <div
          className={`fav ${liked ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // stop card click
            setLiked(!liked);
          }}
        >
          <i
            className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="card-body p-3">
        {/* price */}
        <div className="price">{item.price}</div>
        {/* km and year */}
        <div className="km_year">{item.year}</div>
        {/* title */}
        <div className="title">{item.title}</div>

        {/* location and date */}
        <div className="bottom mb-2">
          <span>{item.location}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  );
}
