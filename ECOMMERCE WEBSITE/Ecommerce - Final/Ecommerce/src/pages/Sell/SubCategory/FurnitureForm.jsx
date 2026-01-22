import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BikeForm.css"; // reuse same css

export default function FurnitureForm() {
  const navigate = useNavigate();

  const category = "Furniture";

  // Sub category state (VERY IMPORTANT)
  const [subCategory, setSubCategory] = useState("");

  // Photo slots
  const [photos, setPhotos] = useState(Array(12).fill(null));

  const handleSelectPhoto = (index, file) => {
    if (!file) return;

    const updated = [...photos];
    updated[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setPhotos(updated);
  };

  const removePhoto = (index) => {
    const updated = [...photos];
    updated[index] = null;
    setPhotos(updated);
  };

  // SUBMIT (later connect to backend)
  const handleSubmit = () => {
    if (!subCategory) {
      alert("Please select a sub category");
      return;
    }

    const adData = {
      category: category, // Furniture
      subCategory: subCategory, // Sofa, Beds, Decor etc.

      // other common fields later…
    };

    console.log("Sending to server:", adData);
  };

  return (
    <div className="sell-form-wrapper">
      {/* TOP BAR */}
      <div className="category-bar">
        <h2>Post your Ad</h2>

        <div className="selected-category">
          <span>Selected category</span>
          <div className="cat-path">
            <strong>{category}</strong>
            <button className="change-btn" onClick={() => navigate("/sell")}>
              Change
            </button>
          </div>
        </div>
      </div>

      <h3>Include some details</h3>

      {/* 🔥 SUB CATEGORY DROPDOWN INSIDE FORM */}
      <div className="form-group">
        <label>Sub Category *</label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>
          <option>Sofa & Dining</option>
          <option>Beds & Wardrobes</option>
          <option>Home Decor & Garden</option>
          <option>Kids Furniture</option>
          <option>Other Household Items</option>
        </select>
      </div>

      {/* COMMON FIELDS */}
      <div className="form-group">
        <label>Ad Title *</label>
        <input maxLength="70" />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea rows="4"></textarea>
      </div>

      <h3>Set a price</h3>
      <div className="price-group">
        <span>₹</span>
        <input type="number" />
      </div>

      {/* PHOTOS */}
      <h3>Upload up to 12 photos</h3>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div className="photo-slot" key={index}>
            {photo ? (
              <>
                <img src={photo.preview} alt="preview" />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removePhoto(index)}
                >
                  ✕
                </button>
              </>
            ) : (
              <label className="add-photo">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleSelectPhoto(index, e.target.files[0])}
                />
                <span className="plus">+</span>
              </label>
            )}
          </div>
        ))}
      </div>

      {/* LOCATION */}
      <h3>Confirm your location</h3>

      <div className="form-group">
        <label>City *</label>
        <input />
      </div>

      <div className="form-group">
        <label>Pin Code *</label>
        <input />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Post Ad
      </button>
    </div>
  );
}
