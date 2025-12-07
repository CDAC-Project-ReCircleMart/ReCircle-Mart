import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      login();
      alert("Logged in!");
      nav("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  }

  return (
    <div className="container">
      {/* LEFT */}
      <div className="left">
        <h1>
          Fast
          <br />
          Friendly
          <br />
          Trusted Marketplace.
        </h1>
        <p>A user-friendly platform for smart deals and real value.</p>

        <div className="illustration">
          <img src="/src/assets/ecom.png" alt="illustration" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="welcome">
          <h2>Welcome Back</h2>
          <p className="subtitle">Please login to your account</p>
        </div>
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="divider">Or Login With</div>

        <div className="social-buttons">
          <button className="google">
            <i className="fa-brands fa-google"></i> Google
          </button>

          <button className="facebook">
            <i className="fa-brands fa-facebook-f"></i> Facebook
          </button>
        </div>

        <p className="signup">
          Don't have an account? <Link to="/register">Signup</Link>
        </p>
      </div>
    </div>
  );
}
