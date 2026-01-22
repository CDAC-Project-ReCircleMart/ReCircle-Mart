import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ item }) {
  const navigate = useNavigate();

  return (
    <div className="olx-card" onClick={() => navigate(`/listing/${item.id}`)}>
      {/* IMAGE */}
      <div className="card-img">
        <img src={item.image} alt={item.title} />

        <span className="fav">
          <i className="fa-regular fa-heart" ></i>
        </span>
      </div>


      <div className="card-body">
        <div className="price">{item.price}</div>
        <div className="meta">
          {item.year} · {item.km}
        </div>
        <div className="title">{item.title}</div>

        <div className="bottom">
          <span>{item.location}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  );
}
