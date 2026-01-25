import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { listings } from "../../data";
import "./ProductDetail.css";
import { getOrCreateChatRoom } from "../../Service/chatRoomService";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = listings.find((l) => l.id == id);

  const images = listing?.images || [listing?.image]; // support multiple images
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!listing) {
    return (
      <div className="product-wrapper">
        <p>Listing not found.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-page">
      {/* IMAGE SECTION */}
      <div className="image-section">
        <button className="arrow left-arrow" onClick={prevImage}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <img src={images[currentIndex]} alt={listing.title} />

        <button className="arrow right-arrow" onClick={nextImage}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="product-container">
        {/* LEFT SIDE */}
        <div className="left-panel mt-2">
          {/* TITLE CARD */}
          <div className="detail-card">
            <h2 className="product-title ">{listing.title}</h2>
          </div>

          {/* OVERVIEW CARD */}
          <div className="detail-card">
            <h3>Overview</h3>

            <div className="overview-grid">
              {/* YEAR BOUGHT */}
              <div>
                <i className="fa-solid fa-calendar"></i>
                <span>{listing.year || "2022"}</span>
              </div>

              {/* LOCATION */}
              <div>
                <i className="fa-solid fa-location-dot"></i>
                <span>{listing.location}</span>
              </div>

              {/* POSTING DATE */}
              <div>
                <i className="fa-solid fa-calendar-days"></i>
                <span>{listing.date}</span>
              </div>

              {/* SELLER */}
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
        <div className="right-panel mt-2">
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

            {/* <button className="chat-btn" onClick={() => navigate("/messages")}>
              <i className="fa-solid fa-comment-dots"></i> Chat with seller
            </button> */}
            <button
              className="chat-btn"
              onClick={async () => {
                try {
                  const room = await getOrCreateChatRoom("PRODUCT", listing.id);


                  navigate("/messages", {
                    state: {
                      chatRoomId: room.chatRoomId,
                      seller: listing.owner,
                    },
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <i className="fa-solid fa-comment-dots"></i> Chat with seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
