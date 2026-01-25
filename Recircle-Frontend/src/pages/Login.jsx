import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Service/user";
import { useAuth } from "../providers/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const onLogin = async () => {
    if (!email) {
      toast.warning("Please enter email");
      return;
    }

    if (!password) {
      toast.warning("Please enter password");
      return;
    }

    const response = await login(email, password);
    console.log("LOGIN RESPONSE:", response);

    if (response.status === "success" && response.token) {
      toast.success("Login successful");

      localStorage.setItem("token", response.token);

      loginUser({
        userToken: response.token
      });

      navigate("/home");
    } else {
      toast.error("Login credentials not matched");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control mb-3"
        />

        <button onClick={onLogin} className="login-btn">
          Login
        </button>

        <p className="signup">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
