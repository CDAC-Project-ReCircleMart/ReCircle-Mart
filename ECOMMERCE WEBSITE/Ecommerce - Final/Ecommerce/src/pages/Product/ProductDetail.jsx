import { useParams, useNavigate } from "react-router-dom";
import { listings } from "../../data";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = listings.find((l) => l.id == id);

  if (!listing) {
    return (
      <div className="product-wrapper">
        <p>Listing not found.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="product-page">
      {/* IMAGE SECTION */}
      <div className="image-section">
        <img src={listing.image} alt={listing.title} />
      </div>

      {/* MAIN CONTENT */}
      <div className="product-container">
       
        {/* LEFT SIDE */}
        <div className="left-panel">
         
          {/* TITLE CARD */}
          <div className="detail-card">
            <h2 className="product-title">{listing.title}</h2>
            <p className="fuel-tag">
              <i className="fa-solid fa-gas-pump"></i>{" "}
              {listing.fuel || "Petrol"}
            </p>
          </div>

          {/* OVERVIEW CARD */}
          <div className="detail-card">
            <h3>Overview</h3>

            <div className="overview-grid">
              <div>
                <i className="fa-solid fa-gauge-high"></i>
                <span>{listing.km || "10,000"} km</span>
              </div>

              <div>
                <i className="fa-solid fa-location-dot"></i>
                <span>{listing.location}</span>
              </div>

              <div>
                <i className="fa-solid fa-calendar-days"></i>
                <span>{listing.date}</span>
              </div>

              <div>
                <i className="fa-solid fa-user"></i>
                <span>{listing.owner || "Seller"}</span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION CARD */}
          <div className="detail-card">
            <h3>Description</h3>
            <p>
              {listing.description || "No additional description provided."}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          {/* PRICE CARD */}
          <div className="price-card">
            <h2 className="price">{listing.price}</h2>
            <button className="offer-btn">Make Offer</button>
          </div>

          {/* SELLER CARD */}
          <div className="seller-card">
            <div className="seller-info">
              <i className="fa-solid fa-circle-user"></i>
              <div>
                <p className="seller-name">{listing.owner || "Seller"}</p>
                <p className="seller-meta">Member since recently</p>
              </div>
            </div>

            <button className="chat-btn" onClick={() => navigate("/messages")}>
              <i className="fa-solid fa-comment-dots"></i> Chat with seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
