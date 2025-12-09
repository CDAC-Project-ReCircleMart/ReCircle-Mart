import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="tagline">
          <h1>Fast, Friendly & Trusted Marketplace.</h1>
          <p>Your go-to platform for smart buying & selling.</p>
        </div>

        <h2>Create Your Account</h2>
        <p className="subtitle">Join the fastest growing marketplace today!</p>

        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email ID" required />
          <input type="tel" placeholder="Mobile Number (OTP verification)" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit" className="login-btn">Sign Up</button>
        </form>

        <p className="signup">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
