import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="tagline">
          <h1>Fast, Friendly & Trusted Marketplace.</h1>
          <p>Your go-to platform for smart buying & selling.</p>
        </div>

        <div className="welcome">
          <h2>Welcome Back</h2>
          <p className="subtitle">Please login to your account</p>
        </div>

        <form>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup">
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
