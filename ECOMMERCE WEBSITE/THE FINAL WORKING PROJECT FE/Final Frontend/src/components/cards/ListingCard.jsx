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
      removeFavourite(item.id); // remove from favourites
    } else {
      addFavourite(item); // add to favourites
    }
  };

  // 🔴 SHOW ONLY CITY FROM LOCATION (STATE, CITY, LANDMARK)
  const city =
    item.location?.split(",")[1]?.trim() || item.location || "Unknown";

  return (
    <div className="olx-card" onClick={() => navigate(`/product/${item.id}`)}>
      {/* IMAGE AREA */}
      <div className="card-img p-2">
        <img src={item.image} alt={item.title} />

        {/* FAV ICON */}
        <div className={`fav ${isLiked ? "active" : ""}`} onClick={handleLike}>
          <i
            className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="card-body p-3">
        {/* PRICE */}
        <div className="price">₹ {item.price}</div>

        {/* YEAR */}
        <div className="km_year">{item.year}</div>

        {/* TITLE */}
        <div className="title">{item.title}</div>

        {/* LOCATION + DATE */}
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
