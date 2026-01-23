// src/pages/Profile/EditProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [firstName, setFirstName] = useState(user.firstName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      firstName,
      email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated successfully");
    navigate("/profile");
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
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
