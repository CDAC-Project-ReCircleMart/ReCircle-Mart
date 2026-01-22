import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import "./Sell.css";

export default function Sell() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const navigate = useNavigate();

  const handleSubCategoryChange = (sub) => {
    setSelectedSubCategory(sub);

    // Navigate based on category

    //ALL CAR FORMS
    if (selectedCategory === "Cars") {
      navigate("/sell/cars");
    }

    // ALL BIKE FORMS
    if (selectedCategory === "Bikes") {
      if (sub === "Motorcycles") {
        navigate("/sell/bikes/motorcycles");
      }

      if (sub === "Scooters") {
        navigate("/sell/bikes/scooters");
      }

      if (sub === "Bicycles") {
        navigate("/sell/bikes/bicycles");
      }
    }

    // ALL FURNITURE FORM
    if (selectedCategory === "Electronics") {
      navigate("/sell/electronics");
    }
    if (selectedCategory === "Furniture") {
      navigate("/sell/furniture");
    }

    //ALL FASHION FORMS
    if (selectedCategory === "Fashion") {
      navigate("/sell/fashion");
    }

    //ALL PETS FORMS
    if (selectedCategory === "Pets") {
      navigate("/sell/pets");
    }
  };

  return (
    <div className="sell-wrapper">
      <h2 className="sell-title">POST YOUR AD</h2>

      <div className="sell-box">
        {/* CATEGORY */}
        <div className="form-group">
          <label>Choose Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory("");
            }}
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* SUB CATEGORY */}
        {selectedCategory && (
          <div className="form-group">
            <label>Choose Sub Category</label>
            <select
              value={selectedSubCategory}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
            >
              <option value="">Select Sub Category</option>
              {categories[selectedCategory].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
