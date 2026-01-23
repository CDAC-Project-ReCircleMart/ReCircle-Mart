import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BikeForm.css";

export default function MobileForm() {
  const navigate = useNavigate();
  const category = "Mobiles";

  const [subCategory, setSubCategory] = useState("");
  const [photos, setPhotos] = useState(Array(12).fill(null));

  const handleSelectPhoto = (index, file) => {
    if (!file) return;
    const updated = [...photos];
    updated[index] = { file, preview: URL.createObjectURL(file) };
    setPhotos(updated);
  };

  const removePhoto = (index) => {
    const updated = [...photos];
    updated[index] = null;
    setPhotos(updated);
  };

  const handleSubmit = () => {
    alert("Mobile Ad Posted (demo)");
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

      <div className="form-group">
        <label>Sub Category *</label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>
          <option>Mobile Phones</option>
          <option>Tablets</option>
          <option>Accessories</option>
        </select>
      </div>

      <div className="form-group">
        <label>Brand *</label>
        <input placeholder="Enter brand name" />
      </div>

      <div className="form-group">
        <label>Model</label>
        <input placeholder="Enter model name / number" />
      </div>

      <div className="form-group">
        <label>Condition *</label>
        <select>
          <option value="">Select</option>
          <option>New</option>
          <option>Like New</option>
          <option>Used</option>
        </select>
      </div>

      <div className="form-group">
        <label>Year of Purchase *</label>
        <input type="number" placeholder="Ex: 2022" />
      </div>

      <div className="form-group">
        <label>Ad Title *</label>
        <input
          maxLength="70"
          placeholder="Mention the key features of your item"
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          rows="4"
          placeholder="Include condition, features and reason for selling"
        ></textarea>
      </div>

      {/* PRICE */}
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
                  hidden
                  onChange={(e) => handleSelectPhoto(index, e.target.files[0])}
                />
                <span className="plus">+</span>
              </label>
            )}
          </div>
        ))}
      </div>

      {/* LOCATION + REVIEW SAME AS OTHERS */}
      <h3>Confirm your location</h3>
      <div className="form-group">
        <label>State *</label>
        <input />
      </div>
      <div className="form-group">
        <label>City *</label>
        <input />
      </div>

      <h3>Review your details</h3>
      <div className="form-group">
        <label>Name</label>
        <input />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Post Ad
      </button>
    </div>
  );
}
