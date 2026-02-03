import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../services/api";
import { toast } from "react-toastify";
import { setToken } from "../../utils/token";

export default function Login({ onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data.token;
      const user = res.data.user;

      if (!token || !user) {
        toast.error("Login failed: token or user missing");
        return;
      }

      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

      // close overlay if we came from home
      if (onClose) onClose();

      if (user.role === "admin") {
        toast.success("Welcome Admin");
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please check email and password.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* optional close button */}
        {onClose && (
          <button className="login-close" onClick={onClose} type="button">
            ✕
          </button>
        )}

        <h2>Login</h2>

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
          <span className="resend" onClick={() => {
            if (onClose) onClose();
            navigate("/register")
          }
          }>
            Register here
          </span>
        </p>
      </div>
    </div >
  );
}
