// src/pages/Profile/EditProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // 🔴 NEW
import { toast } from "react-toastify"; // 🔴 NEW
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem("user"));

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔴 LOAD CURRENT USER DATA FROM BACKEND
  useEffect(() => {
    if (!localUser) {
      navigate("/login");
      return;
    }

    setFirstName(localUser.firstName);
    setEmail(localUser.email);
  }, [navigate, localUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔴 UPDATE PROFILE IN BACKEND
      const res = await api.put("/users/me", {
        firstName,
        email,
        ...(password && { password }), // only send if user entered new password
      });

      const updatedUser = {
        ...localUser, // keep avatar + role + id + icon
        firstName: res.data.firstName,
        email: res.data.email,
      };

      // 🔴 UPDATE LOCALSTORAGE (KEEP ICON / AVATAR SAME)
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 🟢 TOAST SUCCESS
      toast.success("Profile updated successfully");

      // 🔴 GO BACK TO PROFILE
      navigate("/profile");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update profile";

      // 🔴 TOAST ERROR
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-box">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Name"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />

          <div className="edit-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>

            <button type="button" onClick={() => navigate("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
