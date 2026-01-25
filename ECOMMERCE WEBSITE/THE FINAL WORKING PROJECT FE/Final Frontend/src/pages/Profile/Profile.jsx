import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔴 LOAD USER FROM LOCALSTORAGE FIRST
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (!localUser) {
      navigate("/login");
      return;
    }

    setUser(localUser);

    // 🔴 FETCH USER LISTINGS
    const fetchListings = async () => {
      try {
        const listingsRes = await api.get("/listings/user/me");
        setUserListings(listingsRes.data);
      } catch (err) {
        console.error("PROFILE LISTINGS ERROR:", err);
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [navigate]);

  // 🔴 DELETE LISTING
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/listings/${id}`);
      setUserListings((prev) => prev.filter((item) => item.id !== id));
      toast.success("Listing deleted successfully");
    } catch (err) {
      console.error("DELETE LISTING ERROR:", err);
      toast.error("Failed to delete listing");
    }
  };

  if (loading) return <Loader />;
  if (!user) return null;

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleString()
    : null;

  // 🔴 INTERNAL LISTING CARD (ONLY IMAGE FIX ADDED)
  function MyListingCard({ item }) {
    // 🔥 FIX IMAGE PATH HERE
    const imageSrc = item.image
      ? item.image.startsWith("/uploads")
        ? `http://localhost:8080${item.image}`
        : item.image
      : "/no-image.png";

    return (
      <div className="profile-listing-card">
        <img src={imageSrc} alt={item.title} />

        <div className="listing-info">
          <h4>{item.title}</h4>
          <p className="price">₹ {item.price}</p>

          <div className="listing-actions">
            {/* VIEW */}
            <button
              onClick={() => navigate(`/product/${item.id}`)}
              className="view-btn"
            >
              View
            </button>

            {/* EDIT */}
            <button
              onClick={() => navigate(`/edit-listing/${item.id}`)}
              className="edit-btn"
            >
              <i className="fa-solid fa-pen"></i>
            </button>

            {/* DELETE */}
            <button
              onClick={() => handleDelete(item.id)}
              className="delete-btn"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* LEFT SIDE */}
      <div className="profile-left">
        <div className="profile-avatar-wrapper">
          <img
            src={user.avatar ? user.avatar : "profile.png"}
            alt="profile"
            className="profile-big-img"
          />
        </div>

        <h2 className="profile-name">
          <i className="fa-solid fa-user"></i>
          {user.first_name} {user.last_name}
        </h2>

        <p className="profile-email">
          <i className="fa-solid fa-envelope"></i>
          {user.email}
        </p>

        {joinedDate && (
          <p className="profile-joined">
            <i className="fa-solid fa-calendar-days"></i>
            Joined on {joinedDate}
          </p>
        )}

        <div className="profile-stats">
          <div>
            <strong>{userListings.length}</strong>
            <span>Listings</span>
          </div>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="profile-right">
        <h3 className="my-listings-title">My Listings</h3>

        {userListings.length === 0 ? (
          <div className="no-listing-box">
            <img
              src="startsell.png"
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
              <MyListingCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
