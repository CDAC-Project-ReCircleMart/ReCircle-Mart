import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();

  // ✅ READ USER ONCE
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ PREFILL DATA (SUPPORT BOTH old + new STORAGE KEYS)
  useEffect(() => {
    if (!localUser) {
      navigate("/login");
      return;
    }

    setFirstName(localUser.firstName || localUser.first_name || "");
    setLastName(localUser.lastName || localUser.last_name || "");
    setEmail(localUser.email || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First name and last name are required");
      return;
    }

    setLoading(true);

    try {
      await api.put("/auth/update-profile", {
        firstName,
        lastName,
        email,
        password: password || ""
      });

      // ✅ NORMALIZE LOCAL STORAGE (camelCase only)
      const updatedUser = {
        ...localUser,
        firstName,
        lastName,
        email
      };

      delete updatedUser.first_name;
      delete updatedUser.last_name;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error("❌ UPDATE PROFILE ERROR:", err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update profile";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        <p className="subtitle">Update your personal information</p>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty to keep current password"
            />
          </div>

          <div className="edit-actions">
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}