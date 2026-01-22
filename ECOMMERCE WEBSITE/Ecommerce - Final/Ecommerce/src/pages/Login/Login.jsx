/**
 * Login.jsx
 * Simple Email + Password login page
 * - UI only
 * - Sends data to backend later
 */

import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: will connect to backend later
    console.log("Login Data:", form);

    /*
      Later API call:
      fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    */
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Enter your email and password</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="login-footer">
          New user? <span>Create account</span>
        </p>
      </div>
    </div>
  );
}
