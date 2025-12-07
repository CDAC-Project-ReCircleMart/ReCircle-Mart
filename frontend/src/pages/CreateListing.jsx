import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CreateListing.css";

export default function CreateListing() {
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [owners, setOwners] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91");

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      await API.post("/listings", {
        title,
        description,
        price: parseFloat(price),
        category: "Cars",
        brand,
        year,
        fuel,
        transmission,
        kmDriven,
        owners,
        state,
        sellerId: user.id,
      });

      alert("Listing created successfully!");
      navigate("/");
    } catch (err) {
      alert("Error creating listing");
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">POST YOUR PRODUCT INFORMATION</h1>

      {/* ✅ SINGLE CONTAINER FOR ALL INPUTS */}
      <div className="all-inputs">
        {/* DETAILS */}
        <section className="card">
          <h3>INCLUDE SOME DETAILS</h3>

          <label>Brand</label>
          <input value={brand} onChange={(e) => setBrand(e.target.value)} />

          <label>Year</label>
          <input value={year} onChange={(e) => setYear(e.target.value)} />

          <label>Fuel Type</label>
          <div className="btn-group">
            <button type="button" onClick={() => setFuel("CNG & HYBRID")}>
              CNG & HYBRID
            </button>
            <button type="button" onClick={() => setFuel("DIESEL")}>
              DIESEL
            </button>
            <button type="button" onClick={() => setFuel("PETROL")}>
              PETROL
            </button>
            <button type="button" onClick={() => setFuel("ELECTRIC")}>
              ELECTRIC
            </button>
          </div>

          <label>Transmission</label>
          <div className="btn-group">
            <button type="button" onClick={() => setTransmission("AUTOMATIC")}>
              AUTOMATIC
            </button>
            <button type="button" onClick={() => setTransmission("MANUAL")}>
              MANUAL
            </button>
          </div>

          <label>KM Driven</label>
          <input
            value={kmDriven}
            onChange={(e) => setKmDriven(e.target.value)}
          />

          <label>No of Owners</label>
          <div className="btn-group">
            <button type="button" onClick={() => setOwners("1st")}>
              1st
            </button>
            <button type="button" onClick={() => setOwners("2nd")}>
              2nd
            </button>
            <button type="button" onClick={() => setOwners("3rd")}>
              3rd
            </button>
            <button type="button" onClick={() => setOwners("4th")}>
              4th
            </button>
            <button type="button" onClick={() => setOwners("4+")}>
              4+
            </button>
          </div>

          <label>Add Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>

        {/* PRICE */}
        <section className="card">
          <h3>SET PRICE</h3>
          <input
            placeholder="₹ Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </section>

        {/* PHOTOS */}
        <section className="card">
          <h3>UPLOAD PHOTOS</h3>
          <div className="photo-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="photo-box" key={i}>
                +
              </div>
            ))}
          </div>
        </section>

        {/* LOCATION */}
        <section className="card">
          <h3>CONFIRM YOUR LOCATION</h3>
          <label>State</label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State</option>
            <option>Maharashtra</option>
            <option>Gujarat</option>
            <option>Karnataka</option>
          </select>
        </section>

        {/* REVIEW */}
        <section className="card">
          <h3>REVIEW YOUR DETAILS</h3>

          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <p className="verify-text">
            Let's verify your account
            <br />
            <small>We will send you a confirmation code</small>
          </p>

          <label>Mobile Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </section>
      </div>

      <button className="post-btn" onClick={submit}>
        POST NOW
      </button>
    </div>
  );
}
