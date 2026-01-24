import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../services/api";
import { toast } from "react-toastify"; // 🔴 NEW

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔴 CALL BACKEND API
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // 🔴 SAVE TOKEN + USER
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🟢 TOAST: LOGIN SUCCESS
      toast.success("Login successful!");

      // 🔴 GO HOME AFTER LOGIN
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";

      setError(message);

      // 🔴 TOAST: LOGIN ERROR
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-note">
          New user?{" "}
          <span className="resend" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
