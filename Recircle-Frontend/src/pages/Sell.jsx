import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Sell() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [product, setProduct] = useState({
    categoryId: "",
    brand: "",
    year: "",
    fuelType: "",
    transmission: "",
    kmDriven: "",
    owners: "",
    condition: "",
    title: "",
    description: "",
    location: "",
    price: ""
  });

  // Load categories from backend
  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle button selection
  const selectValue = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProduct({ ...product, categoryId });

    const cat = categories.find(
      c => c.categoryId === Number(categoryId)
    );
    setSelectedCategory(cat?.categoryName || "");
  };

  // Submit product
  const submitProduct = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.description ||
      !product.location ||
      !product.price ||
      !product.categoryId
    ) {
      alert("❌ Please fill all required fields");
      return;
    }

    try {
      await api.post("/products", {
        title: product.title,
        description: product.description,
        location: product.location,
        price: Number(product.price),
        categoryId: Number(product.categoryId)
      });

      alert("✅ Ad posted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to post ad");
    }
  };

  return (
    <form className="sell-container" onSubmit={submitProduct}>
      <h2 className="page-title">POST YOUR AD</h2>

      <div className="section">
        <h3 className="section-title">Include some details</h3>

        {/* CATEGORY */}
        <label>Category</label>
        <select
          className="input"
          value={product.categoryId}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        {/* ================= CAR FIELDS ================= */}
        {selectedCategory === "Cars" && (
          <>
            <label>Brand</label>
            <input className="input" name="brand" onChange={handleChange} />

            <label>Year</label>
            <input
              type="number"
              className="input"
              name="year"
              onChange={handleChange}
            />

            <label>Fuel Type</label>
            <div className="button-group">
              {["CNG & Hybrids", "Diesel", "Petrol", "Electric"].map(f => (
                <button
                  type="button"
                  key={f}
                  className={`select-btn ${
                    product.fuelType === f ? "active" : ""
                  }`}
                  onClick={() => selectValue("fuelType", f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <label>Transmission</label>
            <div className="button-group">
              {["Automatic", "Manual"].map(t => (
                <button
                  type="button"
                  key={t}
                  className={`select-btn ${
                    product.transmission === t ? "active" : ""
                  }`}
                  onClick={() => selectValue("transmission", t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <label>KM Driven</label>
            <input
              type="number"
              className="input"
              name="kmDriven"
              onChange={handleChange}
            />

            <label>No of owners</label>
            <div className="button-group">
              {["1st", "2nd", "3rd", "4th", "4+"].map(o => (
                <button
                  type="button"
                  key={o}
                  className={`select-btn ${
                    product.owners === o ? "active" : ""
                  }`}
                  onClick={() => selectValue("owners", o)}
                >
                  {o}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ================= ELECTRONICS FIELDS ================= */}
        {selectedCategory === "Electronics" && (
          <>
            <label>Brand</label>
            <input className="input" name="brand" onChange={handleChange} />

            <label>Condition</label>
            <select
              className="input"
              name="condition"
              onChange={handleChange}
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </>
        )}

        {/* ================= COMMON FIELDS ================= */}
        <label>Ad title</label>
        <input className="input" name="title" onChange={handleChange} />

        <label>Description</label>
        <textarea
          className="textarea"
          name="description"
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          className="input"
          name="location"
          placeholder="Enter location"
          onChange={handleChange}
        />
      </div>

      <div className="section">
        <h3 className="section-title">Set price</h3>
        <input
          type="number"
          className="input"
          name="price"
          onChange={handleChange}
        />
      </div>

      <button className="post-btn" type="submit">
        Post Now
      </button>
    </form>
  );
}
