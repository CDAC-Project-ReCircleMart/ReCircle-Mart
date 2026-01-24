// src/pages/Profile/Profile.jsx
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
  const [loading, setLoading] = useState(false);

  // 🔴 FETCH PROFILE + USER LISTINGS
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // GET USER INFO FROM BACKEND
        const userRes = await api.get("/users/me");
        setUser(userRes.data);

        // GET USER LISTINGS
        const listingsRes = await api.get("/listings/my");
        setUserListings(listingsRes.data);
      } catch (err) {
        toast.error("Please login again");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  // 🔴 KEEP AVATAR FROM LOCALSTORAGE (AS YOU REQUESTED)
  const localUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">
      {/* LEFT SIDE - USER INFO */}
      <div className="profile-left">
        <img
          src={localUser?.icon || "/default-user.png"}
          alt="profile"
          className="profile-big-img"
        />

        <h2>
          {user.firstName} {user.lastName}
        </h2>
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
              src="/start-selling.png"
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
