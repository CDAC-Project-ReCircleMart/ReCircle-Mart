/**
 * Sidebar.jsx
 * Filters sidebar component
 * Used on Home / Listings pages
 * UI and logic kept exactly same
 */

import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    budget: "",
    brand: "",
    km: "",
    year: "",
    fuel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <aside className="sidebar">
      <h3>Filters</h3>

      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="">Category</option>
        <option value="Cars">Cars</option>
        <option value="Bikes">Bikes</option>
        <option value="Mobile Phones">Mobile Phones</option>
        <option value="Scooters">Scooters</option>
        <option value="Furniture">Furniture</option>
        <option value="Properties">Properties</option>
        <option value="Jobs">Jobs</option>
        <option value="Electronics">Electronics</option>
      </select>

      <select name="location" value={filters.location} onChange={handleChange}>
        <option value="">Location</option>
        <option value="Hinjewadi">Hinjewadi</option>
        <option value="Baner">Baner</option>
        <option value="Bhumkar Chowk">Bhumkar Chowk</option>
        <option value="Kothrud">Kothrud</option>
        <option value="Nigdi">Nigdi</option>
        <option value="Akurdi">Akurdi</option>
        <option value="Vadgaon">Vadgaon</option>
        <option value="Wakad">Wakad</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <select name="budget" value={filters.budget} onChange={handleChange}>
        <option value="">Budget</option>
        <option value="0-50000">0–50,000</option>
        <option value="50000-100000">50,000–1,00,000</option>
        <option value="100000-200000">1,00,000–2,00,000</option>
        <option value="200000-500000">2,00,000–5,00,000</option>
        <option value="500000+">5,00,000+</option>
      </select>

      <select name="brand" value={filters.brand} onChange={handleChange}>
        <option value="">Brand / Model</option>
        <option value="Maruti Suzuki">Maruti Suzuki</option>
        <option value="Honda">Honda</option>
        <option value="Suzuki">Suzuki</option>
        <option value="TVS">TVS</option>
        <option value="Hyundai">Hyundai</option>
        <option value="Hero">Hero</option>
        <option value="Royal Enfield">Royal Enfield</option>
        <option value="Skoda">Skoda</option>
      </select>

      <select name="km" value={filters.km} onChange={handleChange}>
        <option value="">KM Driven</option>
        <option value="0-5000">0–5,000</option>
        <option value="5000-10000">5,000–10,000</option>
        <option value="10000-20000">10,000–20,000</option>
        <option value="20000-50000">20,000–50,000</option>
        <option value="50000+">50,000+</option>
      </select>

      <select name="year" value={filters.year} onChange={handleChange}>
        <option value="">Year</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
      </select>

      <select name="fuel" value={filters.fuel} onChange={handleChange}>
        <option value="">Fuel</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
        <option value="CNG">CNG</option>
      </select>
    </aside>
  );
}
