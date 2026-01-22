/**
 * Login.jsx
 * OLX-style Login Modal
 * Phone / Email + OTP (UI only)
 */

import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [step, setStep] = useState(0); // 0 = choose, 1 = input, 2 = otp
  const [method, setMethod] = useState(""); // phone | email
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (val, index) => {
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <span className="close-btn">✕</span>

        {/* STEP 0 – METHOD SELECTION */}
        {step === 0 && (
          <>
            <img
              src="https://statics.olx.in/external/base/img/loginEntryPointPost.webp"
              alt="OLX"
              className="login-logo"
            />

            <h5>Help us become one of the safest places to buy and sell</h5>

            <button
              className="login-outline-btn"
              onClick={() => {
                setMethod("phone");
                setStep(1);
              }}
            >
              📱 Continue with phone
            </button>

            <button
              className="login-outline-btn"
              onClick={() => {
                setMethod("email");
                setStep(1);
              }}
            >
              ✉️ Login with Email
            </button>
          </>
        )}

        {/* STEP 1 – INPUT */}
        {step === 1 && (
          <>
            <h5>Enter your {method === "phone" ? "phone number" : "email"}</h5>

            <input
              type={method === "phone" ? "tel" : "email"}
              placeholder={
                method === "phone" ? "Phone number" : "Email address"
              }
              className="login-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button className="login-btn" onClick={() => value && setStep(2)}>
              Next
            </button>
          </>
        )}

        {/* STEP 2 – OTP */}
        {step === 2 && (
          <>
            <h5>Enter verification code</h5>
            <p className="otp-note">
              We sent a 4-digit code to <b>{value}</b>
            </p>

            <div className="otp-box">
              {otp.map((d, i) => (
                <input
                  key={i}
                  maxLength="1"
                  value={d}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                />
              ))}
            </div>

            <button className="login-btn">Verify</button>

            <span className="resend">Request a new code</span>
          </>
        )}
      </div>
    </div>
  );
}
