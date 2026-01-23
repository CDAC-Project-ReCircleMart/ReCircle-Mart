import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BikeForm.css";

export default function PetForm() {
  const navigate = useNavigate();
  const category = "Pets";

  const [subCategory, setSubCategory] = useState(""); // NEW
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
    if (!subCategory) {
      alert("Please select a sub category");
      return;
    }

    const adData = {
      category: category,
      subCategory: subCategory,
      // later add title, description, price, photos, location, etc.
    };

    console.log("Sending to backend:", adData);
    alert("Pet Ad Posted (demo)");
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

      {/* SUB CATEGORY DROPDOWN */}
      <div className="form-group">
        <label>Sub Category *</label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>
          <option>Fishes & Aquarium</option>
          <option>Pet Food & Accessories</option>
          <option>Dogs</option>
          <option>Other Pets</option>
        </select>
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
        <input type="number" placeholder="Price" />
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
                  accept="image/*"
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
        <label>State *</label>
        <input />
      </div>
      <div className="form-group">
        <label>District *</label>
        <input />
      </div>
      <div className="form-group">
        <label>City *</label>
        <input />
      </div>
      <div className="form-group">
        <label>Pin Code *</label>
        <input />
      </div>

      {/* REVIEW */}
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
