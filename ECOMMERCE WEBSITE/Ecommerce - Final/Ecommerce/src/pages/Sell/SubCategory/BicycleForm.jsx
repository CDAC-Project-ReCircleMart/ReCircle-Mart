import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BikeForm.css"; // UI unchanged

export default function BicycleForm() {
  const navigate = useNavigate();
  const { type } = useParams(); // bicycles

  const category = "Bikes";

  const subCategories = [
    "Bicycles",
    "Electric Cycles",
    "Kids Cycles",
    "Mountain Bikes",
    "Road Bikes",
  ];

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

  const [photos, setPhotos] = useState(Array(12).fill(null));

  const [form, setForm] = useState({
    subCategory: type || "",
    title: "",
    purchasedYear: "",
    state: "",
    city: "",
    landmark: "",

    // CATEGORY SPECIFIC
    brand: "",
    bicycleType: "",
    frameSize: "",
    gearType: "",
    material: "",
    condition: "",
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

  const handleSubmit = async () => {
    // GROUP CATEGORY FIELDS
    const description = `Brand:${form.brand}, Type:${form.bicycleType}, Frame:${form.frameSize}, Gear:${form.gearType}, Material:${form.material}, Condition:${form.condition}, Price:${form.price}`;

    // COMBINE LOCATION
    const location = `${form.state}, ${form.city}, ${form.landmark}`;

    const payload = {
      subCategory: form.subCategory,
      name: form.title,
      description,
      purchasedYear: form.purchasedYear,
      location,
      images: photos.filter((p) => p !== null).map((p) => p.file),
    };

    try {
      await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("Bicycle ad posted successfully!");
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
        <label>Bicycle Type *</label>
        <select
          name="bicycleType"
          value={form.bicycleType}
          onChange={handleChange}
        >
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
        <input
          name="frameSize"
          value={form.frameSize}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Gear Type *</label>
        <select name="gearType" value={form.gearType} onChange={handleChange}>
          <option value="">Select</option>
          <option>Single Speed</option>
          <option>Multi Speed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Material *</label>
        <select name="material" value={form.material} onChange={handleChange}>
          <option value="">Select</option>
          <option>Steel</option>
          <option>Aluminium</option>
          <option>Carbon Fiber</option>
        </select>
      </div>

      <div className="form-group">
        <label>Condition *</label>
        <select name="condition" value={form.condition} onChange={handleChange}>
          <option value="">Select</option>
          <option>New</option>
          <option>Like New</option>
          <option>Used</option>
        </select>
      </div>

      <div className="form-group">
        <label>Year Purchased *</label>
        <input
          name="purchasedYear"
          value={form.purchasedYear}
          onChange={handleChange}
        />
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

      {/* PHOTOS (UNCHANGED) */}
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
        <label>Landmark / House / Colony *</label>
        <input name="landmark" value={form.landmark} onChange={handleChange} />
      </div>

      {/* REVIEW SECTION REMOVED */}

      <button className="submit-btn" onClick={handleSubmit}>
        Post Ad
      </button>
    </div>
  );
}
