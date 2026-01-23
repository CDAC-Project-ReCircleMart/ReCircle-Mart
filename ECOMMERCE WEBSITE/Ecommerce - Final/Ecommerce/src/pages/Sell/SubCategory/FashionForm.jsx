import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BikeForm.css"; // reuse same common css

export default function FashionForm() {
  const navigate = useNavigate();

  const category = "Fashion";

  // Sub category state
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
      category: category, // Fashion
      subCategory: subCategory, // Men / Women / Kids

      // other fields later…
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

      {/* SUB CATEGORY DROPDOWN */}
      <div className="form-group">
        <label>Sub Category *</label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">Select Sub Category</option>
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>
      </div>

      {/* FASHION SPECIFIC FIELDS */}
      <div className="form-group">
        <label>Brand *</label>
        <input type="text" placeholder="Enter brand name" />
      </div>

      <div className="form-group">
        <label>Product Type *</label>
        <select>
          <option value="">Select</option>
          <option>T-Shirts</option>
          <option>Shirts</option>
          <option>Jeans</option>
          <option>Trousers</option>
          <option>Dresses</option>
          <option>Ethnic Wear</option>
          <option>Footwear</option>
          <option>Accessories</option>
        </select>
      </div>

      <div className="form-group">
        <label>Size *</label>
        <select>
          <option value="">Select</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
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
        <input
          maxLength="70"
          placeholder="Mention the key features of your item"
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          rows="4"
          placeholder="Include condition, size, brand and reason for selling"
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

      {/* REVIEW PROFILE */}
      <h3>Review your details</h3>

      <div className="form-group">
        <label>Name</label>
        <input placeholder="Enter Your Name" maxLength="30" />
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Post Ad
      </button>
    </div>
  );
}
