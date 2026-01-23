// src/pages/Profile/Profile.jsx
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // TEMP – later replace with backend listings
  const userListings = []; // empty = no products

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-container">
      {/* LEFT SIDE - USER INFO */}
      <div className="profile-left">
        <img
          src={user.icon || "/default-user.png"}
          alt="profile"
          className="profile-big-img"
        />

        <h2>{user.firstName}</h2>
        <p className="profile-email">{user.email}</p>

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* RIGHT SIDE - USER LISTINGS */}
      <div className="profile-right">
        {userListings.length === 0 ? (
          <div className="no-listing-box">
            <img
              src="/start-selling.png" // add any illustration in public folder
              alt="start selling"
              className="no-listing-img"
            />

            <h3>You haven't listed anything yet</h3>
            <p>Start selling now</p>

            <button className="sell-now-btn" onClick={() => navigate("/sell")}>
              Start Selling
            </button>
          </div>
        ) : (
          <div className="listing-grid">
            {userListings.map((item) => (
              <div key={item.id} className="listing-card">
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>₹ {item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
