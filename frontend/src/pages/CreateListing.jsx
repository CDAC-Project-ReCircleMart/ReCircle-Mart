import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      await API.post("/listings", {
        title,
        description,
        price: parseFloat(price),
        category,
        sellerId: user.id,
      });
      alert("Listing created!");
      nav("/");
    } catch (err) {
      alert("Error creating listing");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create Listing</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={submit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
