import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BikeForm.css"; // UI unchanged

export default function BikeForm() {
  const navigate = useNavigate();
  const { type } = useParams(); // motorcycles / scooters / bicycles

  const category = "Bikes";

  const subCategories = ["Motorcycles", "Scooters", "Bicycles"];

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  // 12 fixed photo slots
  const [photos, setPhotos] = useState(Array(12).fill(null));

  const [form, setForm] = useState({
    subCategory: type || "",
    title: "",
    yearOfPurchase: "",
    state: "",
    city: "",
    landmark: "",

    // CATEGORY SPECIFIC
    brand: "",
    model: "",
    fuel: "",
    kmDriven: "",
    descriptionText: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

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

  // SUBMIT
  const handleSubmit = async () => {
    // GROUP CATEGORY SPECIFIC FIELDS INTO DESCRIPTION
    const description = `Brand:${form.brand}, Model:${form.model}, Fuel:${form.fuel}, KMDriven:${form.kmDriven}, Notes:${form.descriptionText}, Price:${form.price}`;

    // COMBINE LOCATION
    const location = `${form.state}, ${form.city}, ${form.landmark}`;

    const payload = {
      subCategory: form.subCategory,
      name: form.title,
      description,
      purchasedYear: form.yearOfPurchase,
      location,
      images: photos.filter((p) => p !== null).map((p) => p.file),
    };

    try {
      await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("Bike ad posted successfully!");
    } catch (err) {
      toast.error("Failed to post ad");
    }
  };

  return (
    <div className="sell-form-wrapper">
      {/* TOP CATEGORY BAR */}
      <div className="category-bar">
        <h2>Post your Ad</h2>

        <div className="selected-category">
          <span>Selected category</span>
          <div className="cat-path">
            <strong>{category}</strong> / <span>{form.subCategory}</span>
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
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {subCategories.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* TITLE */}
      <div className="form-group">
        <label>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Brand *</label>
        <input name="brand" value={form.brand} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Model *</label>
        <input name="model" value={form.model} onChange={handleChange} />
      </div>

      {/* YEAR OF PURCHASE */}
      <div className="form-group">
        <label>Year of Purchase *</label>
        <input
          type="number"
          name="yearOfPurchase"
          value={form.yearOfPurchase}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Fuel *</label>
        <select name="fuel" value={form.fuel} onChange={handleChange}>
          <option value="">Select</option>
          <option>Electric</option>
          <option>Others</option>
          <option>CNG</option>
          <option>Hybrid</option>
          <option>Petrol</option>
        </select>
      </div>

      <div className="form-group">
        <label>KM Driven *</label>
        <input
          type="number"
          name="kmDriven"
          value={form.kmDriven}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          rows="4"
          name="descriptionText"
          value={form.descriptionText}
          onChange={handleChange}
          placeholder="Include condition, features and reason for selling"
        ></textarea>
      </div>

      <h3>Set a price</h3>
      <div className="price-group">
        <span>₹</span>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      {/* UPLOAD PHOTOS */}
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

      {/* STATE DROPDOWN */}
      <div className="form-group">
        <label>State *</label>
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {indianStates.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>City *</label>
        <input name="city" value={form.city} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Landmark / Address *</label>
        <input name="landmark" value={form.landmark} onChange={handleChange} />
      </div>

      {/* REVIEW SECTION REMOVED */}

      <button className="submit-btn" onClick={handleSubmit}>
        Post Ad
      </button>
    </div>
  );
}
