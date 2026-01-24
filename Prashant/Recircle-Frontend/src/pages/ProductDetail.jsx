import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch product by id
  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="product-wrapper">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-wrapper">
        <p>Listing not found.</p>
        <button className="post-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-wrapper">
      <div className="product-card">
        {/* PRODUCT IMAGE */}
        <img
          src={product.imageUrl || "/placeholder-car.png"}
          alt={product.title}
          className="product-image"
        />

        {/* PRODUCT INFO */}
        <div className="product-info">
          {/* TITLE */}
          <h2 className="product-title">{product.title}</h2>

          {/* PRICE */}
          <div className="product-price">₹ {product.price}</div>

          {/* OWNER */}
          <p className="product-owner">
            <i className="fa-solid fa-user"></i>
            {product.ownerName || "Owner Name Not Provided"}
          </p>

          {/* LOCATION */}
          <p className="product-location">
            <i className="fa-solid fa-location-dot"></i>
            {product.location}
          </p>

          {/* DATE */}
          <p className="product-date">
            <i className="fa-solid fa-clock"></i>
            Posted:{" "}
            {product.createdAt
              ? new Date(product.createdAt).toLocaleDateString()
              : "Recently"}
          </p>

          {/* FUEL TYPE */}
          <p className="product-fuel">
            <i className="fa-solid fa-gas-pump"></i>
            {product.fuelType || "Petrol"}
          </p>

          {/* DESCRIPTION */}
          <p className="product-description">
            {product.description || "No additional description provided."}
          </p>
        </div>
      </div>
    </div>
  );
}
