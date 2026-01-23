import { useState } from "react";
import "./CarForm.css";
import { useNavigate, useParams } from "react-router-dom";

export default function CarForm() {
  // 20 fixed photo slots
  const navigate = useNavigate();
  const { type } = useParams(); // suv / sedan / hatchback

  const category = "Cars";
  const subCategory = type;

  const [photos, setPhotos] = useState(Array(20).fill(null));

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
      <h2>Include some details</h2>

      <div className="form-group">
        <label>Brand *</label>
        <input type="text" />
      </div>

<div className="form-group">
        <label>Model *</label>
        <input type="text" />
      </div>

      <div className="form-group">
        <label>Year *</label>
        <input type="number" />
      </div>

      <div className="form-group">
        <label>Fuel *</label>
        <select>
          <option value="">Select</option>
          <option>CNG & Hybrids</option>
          <option>Diesel</option>
          <option>Electric</option>
          <option>LPG</option>
          <option>Petrol</option>
        </select>
      </div>

      <div className="form-group">
        <label>Transmission *</label>
        <select>
          <option value="">Select</option>
          <option>Automatic</option>
          <option>Manual</option>
        </select>
      </div>

      <div className="form-group">
        <label>KM Driven *</label>
        <input type="number" />
      </div>

      <div className="form-group">
        <label>No. of Owners *</label>
        <select>
          <option value="">Select</option>
          <option>1st</option>
          <option>2nd</option>
          <option>3rd</option>
          <option>4th</option>
          <option>4+</option>
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

      <h6>Set a price</h6>
      <div className="price-group">
        <span>₹</span>
        <input type="number" />
      </div>

      {/* UPLOAD PHOTOS */}
      <h2>Upload up to 20 photos</h2>

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
        <label>State *</label>
        <input type="text" placeholder="Enter State" />
      </div>

      <div className="form-group">
        <label>District *</label>
        <input type="text" placeholder="Enter District" />
      </div>

      <div className="form-group">
        <label>Taluka *</label>
        <input type="text" placeholder="Enter Taluka" />
      </div>

      <div className="form-group">
        <label>City *</label>
        <input type="text" placeholder="Enter City" />
      </div>

      <div className="form-group">
        <label>Address *</label>
        <textarea
          rows="3"
          placeholder="Enter full address (Area, Street, Landmark...)"
        ></textarea>
      </div>

      <div className="form-group">
        <label>Pin Code *</label>
        <input type="number" placeholder="Enter Pin Code" />
      </div>

      
      <button className="submit-btn">Post Ad</button>
    </div>
  );
}
