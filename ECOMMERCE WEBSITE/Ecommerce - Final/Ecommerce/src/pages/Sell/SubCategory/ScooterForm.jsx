import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BikeForm.css"; // reuse same CSS

export default function ScooterForm() {
  const navigate = useNavigate();
  const { type } = useParams(); // scooters

  const category = "Bikes";

  const subCategories = ["Scooters", "Electric Scooters", "Mopeds"];

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

  const [form, setForm] = useState({
    subCategory: type || "",
    title: "",
    yearOfPurchase: "",
    state: "",
    city: "",
    landmark: "",

    // SCOOTER SPECIFIC
    brand: "",
    model: "",
    fuel: "",
    kmDriven: "",
    owners: "",
    descriptionText: "",
    price: "",
  });

  const [photos, setPhotos] = useState(Array(12).fill(null));

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
    if (!form.subCategory) {
      toast.error("Please select a sub category");
      return;
    }

    // GROUP SCOOTER FIELDS INTO DESCRIPTION
    const description = `Brand:${form.brand}, Model:${form.model}, Fuel:${form.fuel}, KMDriven:${form.kmDriven}, Owners:${form.owners}, Notes:${form.descriptionText}, Price:${form.price}`;

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

      toast.success("Scooter ad posted successfully!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to post ad");
    }
  };

  return (
    <div className="sell-form-wrapper">
      {/* TOP BAR */}
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

      {/* SUB CATEGORY */}
      <div className="form-group">
        <label>Sub Category *</label>
        <select
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Sub Category</option>
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
          <option>Petrol</option>
          <option>Electric</option>
          <option>Hybrid</option>
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
        <label>No. of Owners *</label>
        <select name="owners" value={form.owners} onChange={handleChange}>
          <option value="">Select</option>
          <option>1st</option>
          <option>2nd</option>
          <option>3rd</option>
          <option>4+</option>
        </select>
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          rows="4"
          name="descriptionText"
          value={form.descriptionText}
          onChange={handleChange}
        ></textarea>
      </div>

      <h3>Set a price</h3>
      <div className="price-group">
        <span>₹</span>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
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

      <button className="submit-btn" onClick={handleSubmit}>
        Post Ad
      </button>
    </div>
  );
}
