import { useNavigate } from "react-router-dom";
import "./ListingCard.css";
import { useFavourites } from "../../context/FavouritesContext";

export default function ListingCard({ item }) {
  const navigate = useNavigate();
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  // 🔴 CHECK IF THIS ITEM IS ALREADY LIKED
  const isLiked = favourites.some((fav) => fav.id === item.id);

  const handleLike = (e) => {
    e.stopPropagation(); // stop card navigation

    if (isLiked) {
      removeFavourite(item.id);
    } else {
      addFavourite(item.id);
    }
  };

  // 🔴 SHOW ONLY CITY FROM LOCATION
  const city =
    item.location?.split(",")[1]?.trim() || item.location || "Unknown";

  // 🔴 🔥 ONLY REQUIRED FIX — CONVERT BACKEND IMAGE PATH TO FULL URL
  const imageSrc = item.image
    ? item.image.startsWith("/uploads")
      ? `http://localhost:8080${item.image}`
      : item.image
    : "/no-image.png";

  return (
    <div className="olx-card" onClick={() => navigate(`/product/${item.id}`)}>
      {/* IMAGE AREA */}
      <div className="card-img p-2">
        <img src={imageSrc} alt={item.title} />

        {/* FAV ICON */}
        <div className={`fav ${isLiked ? "active" : ""}`} onClick={handleLike}>
          <i
            className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="card-body p-3">
        <div className="price">₹ {item.price}</div>
        <div className="km_year">{item.year}</div>
        <div className="title">{item.title}</div>

        <div className="bottom mb-2">
          <span>{city}</span>
          <span>
            {item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
