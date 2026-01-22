import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BikeForm.css"; // reuse same CSS

export default function BicycleForm() {
  const navigate = useNavigate();
  const { type } = useParams(); // bicycles

  const category = "Bikes";
  const subCategory = type;

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

  return (
    <div className="sell-form-wrapper">
      {/* TOP BAR */}
      <div className="category-bar">
        <h2>Post your Ad</h2>

        <div className="selected-category">
          <span>Selected category</span>
          <div className="cat-path">
            <strong>{category}</strong> / <span>{subCategory}</span>
            <button className="change-btn" onClick={() => navigate("/sell")}>
              Change
            </button>
          </div>
        </div>
      </div>

      <h3>Include some details</h3>

      <div className="form-group">
        <label>Brand *</label>
        <input type="text" />
      </div>

      <div className="form-group">
        <label>Bicycle Type *</label>
        <select>
          <option value="">Select</option>
          <option>Mountain Bike</option>
          <option>Road Bike</option>
          <option>Hybrid</option>
          <option>Kids Cycle</option>
          <option>Electric Cycle</option>
        </select>
      </div>

      <div className="form-group">
        <label>Frame Size *</label>
        <input type="text" placeholder="Ex: Small, Medium, Large / 26, 27.5" />
      </div>

      <div className="form-group">
        <label>Gear Type *</label>
        <select>
          <option value="">Select</option>
          <option>Single Speed</option>
          <option>Multi Speed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Material *</label>
        <select>
          <option value="">Select</option>
          <option>Steel</option>
          <option>Aluminium</option>
          <option>Carbon Fiber</option>
        </select>
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

      <h3>Confirm your location</h3>

      <div className="form-group">
        <label>City *</label>
        <input />
      </div>

      <div className="form-group">
        <label>Pin Code *</label>
        <input />
      </div>

      <h3>Review your details</h3>
      <div className="form-group">
        <label>Name</label>
        <input defaultValue="rohit kavathekar" />
      </div>

      <div className="phone-group">
        <span>+91</span>
        <input type="tel" />
      </div>

      <button className="submit-btn">Post Ad</button>
    </div>
  );
}
