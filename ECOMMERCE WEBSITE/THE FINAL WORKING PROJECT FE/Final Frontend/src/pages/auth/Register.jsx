import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconData from "../../data/icondata";
import "./Register.css";
import api from "../../services/api"; // 🔴 NEW
import { toast } from "react-toastify"; // 🔴 NEW

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [selectedIcon, setSelectedIcon] = useState(iconData[0]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔴 CALL BACKEND API
      await api.post("/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        avatar: selectedIcon, // profile icon
      });

      // 🟢 TOAST: REGISTER SUCCESS
      toast.success("Registration successful! Please login.");

      // 🔴 GO TO LOGIN PAGE
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Try again.";

      // 🔴 TOAST: REGISTER ERROR
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Register</h2>

        {/* ICON SELECTION */}
        <div className="icon-section">
          <p>Choose Profile Icon</p>
          <div className="icon-grid">
            {iconData.map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt="icon"
                className={`icon-img ${selectedIcon === icon ? "active" : ""}`}
                onClick={() => setSelectedIcon(icon)}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleRegister}>
          <input
            className="login-input"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
          />

          <input
            className="login-input"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
          />

          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-note">
          Already have an account?{" "}
          <span className="resend" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
