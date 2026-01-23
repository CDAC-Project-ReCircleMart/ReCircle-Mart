import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconData from "../../data/icondata";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [selectedIcon, setSelectedIcon] = useState(iconData[0]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      icon: selectedIcon,
    };

    localStorage.setItem("registeredUser", JSON.stringify(user));
    navigate("/login"); // go back to login
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

          <button className="login-btn" type="submit">
            Register
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
